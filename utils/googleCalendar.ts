import { google } from 'googleapis'

export interface CalendarIds {
  /** 班表 + 公休事件來源（手 key） */
  schedule: string
  /** 客戶預約來源與寫入目的地（程式寫入） */
  booking: string
  /** true: 分離模式（SCHEDULE / BOOKING 為不同日曆）; false: 舊架構，兩者為同一日曆 */
  isSplit: boolean
}

export function getCalendarClient() {
  const config = useRuntimeConfig()
  const raw = config.googleServiceAccountJson

  // Nuxt may auto-parse the JSON string into an object
  const credentials = typeof raw === 'string' ? JSON.parse(raw) : raw

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })
  return google.calendar({ version: 'v3', auth })
}

export function getCalendarId(location: string): string {
  const config = useRuntimeConfig()

  const calendarMap: Record<string, string> = {
    '台北院區': config.gcalCalendarIdTaipei,
    '台中院區': config.gcalCalendarIdTaichung,
    '高雄院區': config.gcalCalendarIdKaohsiung,
  }

  return calendarMap[location] || config.gcalCalendarId
}

/**
 * 取得指定院區的日曆 ID。
 * 透過 NUXT_USE_SPLIT_CALENDARS 切換新舊架構：
 * - 舊架構（預設）：schedule 與 booking 為同一個院區日曆
 * - 新架構：schedule（班表+公休）與 booking（客戶預約）為不同日曆
 *
 * 任一新日曆 ID 未設定時會 fallback 到 legacy ID，避免遺漏設定造成事故。
 */
export function getCalendarIds(location: string): CalendarIds {
  const config = useRuntimeConfig()
  const useSplit = String(config.useSplitCalendars).toLowerCase() === 'true'

  const legacyId = getCalendarId(location)

  if (!useSplit) {
    return { schedule: legacyId, booking: legacyId, isSplit: false }
  }

  const scheduleMap: Record<string, string> = {
    '台北院區': config.gcalCalendarIdTaipeiSchedule,
    '台中院區': config.gcalCalendarIdTaichungSchedule,
    '高雄院區': config.gcalCalendarIdKaohsiungSchedule,
  }
  const bookingMap: Record<string, string> = {
    '台北院區': config.gcalCalendarIdTaipeiBooking,
    '台中院區': config.gcalCalendarIdTaichungBooking,
    '高雄院區': config.gcalCalendarIdKaohsiungBooking,
  }

  const schedule = scheduleMap[location] || legacyId
  const booking = bookingMap[location] || legacyId

  return { schedule, booking, isSplit: schedule !== booking }
}
