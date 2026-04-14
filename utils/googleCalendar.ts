import { google } from 'googleapis'

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
