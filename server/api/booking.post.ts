import { z } from 'zod'
import { getCalendarClient, getCalendarId } from '~/utils/googleCalendar'

const bookingSchema = z.object({
  concerns: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
      }),
    )
    .max(6)
    .optional()
    .default([]),
  location: z.string().min(1),
  scheduled_at: z.string().datetime({ offset: true }),
  customer_name: z.string().min(1),
  customer_phone: z.string().regex(/^09\d{8}$/, '請輸入正確的手機號碼（09 開頭，共 10 碼）'),
  note: z.string().optional().default(''),
  doctor: z.string().optional().default(''),
})

export default defineEventHandler(async (event) => {
  // 1. Validate input
  const body = await readBody(event)
  const parsed = bookingSchema.safeParse(body)

  if (!parsed.success) {
    throw createError({
      statusCode: 400,
      message: parsed.error.issues.map((i) => i.message).join(', '),
    })
  }

  const data = parsed.data
  const calendarId = getCalendarId(data.location)
  const calendar = getCalendarClient()

  // Derive concern labels for downstream use
  const concernLabels = data.concerns.map((c) => c.label)

  // 2. Double-check slot availability (prevent race condition)
  const slotStart = new Date(data.scheduled_at)
  const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000)

  try {
    const freebusyRes = await calendar.freebusy.query({
      requestBody: {
        timeMin: slotStart.toISOString(),
        timeMax: slotEnd.toISOString(),
        timeZone: 'Asia/Taipei',
        items: [{ id: calendarId }],
      },
    })

    const busySlots = freebusyRes.data.calendars?.[calendarId]?.busy || []
    if (busySlots.length > 0) {
      throw createError({
        statusCode: 409,
        message: '此時段已被預約，請選擇其他時間。',
      })
    }
  } catch (err: any) {
    // If it's our own 409, re-throw
    if (err.statusCode === 409) throw err
    console.error('Google Calendar freebusy check failed:', err.message)
    // Continue anyway — don't block booking if GCal check fails
  }

  // 3. Write to Supabase (if configured)
  const config = useRuntimeConfig()
  let appointmentId = crypto.randomUUID()

  if (config.supabaseUrl && config.supabaseServiceRoleKey) {
    try {
      const { getSupabaseClient } = await import('~/utils/supabase')
      const supabase = getSupabaseClient()

      const { data: appointment, error: dbError } = await supabase
        .from('picosure_consultation')
        .insert({
          concerns: data.concerns,
          areas: concernLabels,
          location: data.location,
          scheduled_at: data.scheduled_at,
          customer_name: data.customer_name,
          customer_phone: data.customer_phone,
          doctor: data.doctor,
          note: data.note,
          status: 'pending',
        })
        .select()
        .single()

      if (dbError) {
        console.error('Supabase insert failed:', dbError.message)
      } else {
        appointmentId = appointment.id
      }
    } catch (err: any) {
      console.error('Supabase error:', err.message)
    }
  } else {
    console.log('[Booking] Supabase not configured, skipping DB write')
  }

  // 4. Create Google Calendar event
  let gcalEventId = ''
  try {
    const gcalEvent = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `PicoSure 諮詢預約 - ${data.customer_name}`,
        description: [
          `客戶：${data.customer_name}`,
          `電話：${data.customer_phone}`,
          `院區：${data.location}`,
          data.doctor ? `醫師：${data.doctor}` : '',
          concernLabels.length ? `關注膚況：${concernLabels.join('、')}` : '',
          data.note ? `備註：${data.note}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
        start: { dateTime: slotStart.toISOString(), timeZone: 'Asia/Taipei' },
        end: { dateTime: slotEnd.toISOString(), timeZone: 'Asia/Taipei' },
      },
    })
    gcalEventId = gcalEvent.data.id || ''
    console.log('[Booking] GCal event created:', gcalEventId)

    // Update Supabase with gcal_event_id if available
    if (config.supabaseUrl && config.supabaseServiceRoleKey && gcalEventId) {
      try {
        const { getSupabaseClient } = await import('~/utils/supabase')
        const supabase = getSupabaseClient()
        await supabase
          .from('picosure_consultation')
          .update({ gcal_event_id: gcalEventId })
          .eq('id', appointmentId)
      } catch {
        // non-critical
      }
    }
  } catch (err: any) {
    console.error('Google Calendar insert failed:', err.message, err.response?.data)
    throw createError({
      statusCode: 500,
      message: `無法建立行事曆事件：${err.message}`,
    })
  }

  // 5. LINE notifications
  try {
    const { notifyStaff, notifyCustomer } = await import('~/utils/lineNotify')
    const scheduledAtDisplay = slotStart.toLocaleString('zh-TW', {
      timeZone: 'Asia/Taipei',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })

    const notifyPayload = {
      customerName: data.customer_name,
      customerPhone: data.customer_phone,
      location: data.location,
      scheduledAt: scheduledAtDisplay,
      doctor: data.doctor,
      areas: concernLabels,
    }

    await Promise.allSettled([
      notifyStaff(notifyPayload),
      notifyCustomer(notifyPayload),
    ])
  } catch (err: any) {
    console.error('[LINE] Notification error:', err.message)
  }

  // 6. Return success
  return {
    success: true,
    appointment_id: appointmentId,
    gcal_event_id: gcalEventId,
  }
})
