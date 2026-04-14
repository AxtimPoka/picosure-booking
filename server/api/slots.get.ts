import { getCalendarClient, getCalendarId } from '~/utils/googleCalendar'

interface SlotInfo {
  time: string
  doctors: string[]
}

// 取得 Date 在台北時區的小時數（不受伺服器時區影響）
function getTaipeiHour(date: Date): number {
  return parseInt(date.toLocaleString('en-US', { timeZone: 'Asia/Taipei', hour: '2-digit', hour12: false }))
}

function getTaipeiMinute(date: Date): number {
  return parseInt(date.toLocaleString('en-US', { timeZone: 'Asia/Taipei', minute: '2-digit' }))
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const date = query.date as string
  const location = (query.location as string) || '台北院區'

  if (!date) {
    throw createError({ statusCode: 400, message: 'date is required' })
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw createError({ statusCode: 400, message: 'Invalid date format, use YYYY-MM-DD' })
  }

  try {
    const calendarId = getCalendarId(location)
    const calendar = getCalendarClient()

    const timeMin = `${date}T00:00:00+08:00`
    const timeMax = `${date}T23:59:59+08:00`

    // 1. 用 events.list 取得當天所有事件
    const eventsRes = await calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      timeZone: 'Asia/Taipei',
      singleEvents: true,
      orderBy: 'startTime',
    })

    const events = eventsRes.data.items || []

    // 2. 區分「醫師排班事件」與「已預約事件」
    //    醫師排班事件：標題含有「醫師」
    //    已預約事件：其餘所有事件（已佔用時段）
    const doctorEvents: { doctor: string; start: Date; end: Date }[] = []
    const bookedSlots: { start: Date; end: Date }[] = []

    for (const evt of events) {
      const summary = evt.summary || ''
      const start = new Date(evt.start?.dateTime || evt.start?.date || '')
      const end = new Date(evt.end?.dateTime || evt.end?.date || '')

      if (summary.includes('醫師')) {
        doctorEvents.push({ doctor: summary, start, end })
      } else {
        // 只要不是醫師排班事件，就視為已預約/已佔用的時段
        bookedSlots.push({ start, end })
      }
    }

    // 3. 從醫師排班事件產生可用時段（每小時一格）
    //    使用台北時區取得小時數，避免伺服器在 UTC 時換算錯誤
    const slotMap = new Map<string, string[]>() // time -> doctors[]

    for (const doc of doctorEvents) {
      const docStartHour = getTaipeiHour(doc.start)
      const docEndHour = getTaipeiHour(doc.end)
      const docEndMinute = getTaipeiMinute(doc.end)
      // 如果結束分鐘 > 0，該小時也算（例如 17:30 結束，17:00 仍可預約）
      const endHour = docEndMinute > 0 ? docEndHour + 1 : docEndHour

      for (let hour = docStartHour; hour < endHour; hour++) {
        const timeStr = `${hour.toString().padStart(2, '0')}:00`
        if (!slotMap.has(timeStr)) {
          slotMap.set(timeStr, [])
        }
        slotMap.get(timeStr)!.push(doc.doctor)
      }
    }

    // 4. 過濾掉已被預約的時段
    const availableSlots: SlotInfo[] = []

    for (const [time, doctors] of slotMap) {
      const slotStart = new Date(`${date}T${time}:00+08:00`)
      const slotEnd = new Date(slotStart.getTime() + 60 * 60 * 1000)

      const isBooked = bookedSlots.some(
        (busy) => slotStart < busy.end && slotEnd > busy.start,
      )

      if (!isBooked && doctors.length > 0) {
        availableSlots.push({ time, doctors })
      }
    }

    // 5. 按時間排序
    availableSlots.sort((a, b) => a.time.localeCompare(b.time))

    return { slots: availableSlots, source: 'gcal' }
  } catch (err: any) {
    console.error('[Slots] Google Calendar API failed:', err.message)
    return { slots: [], source: 'fallback' }
  }
})
