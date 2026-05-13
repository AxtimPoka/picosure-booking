-- 拆分日曆架構：記錄事件實際寫入的日曆 ID
-- 之後改/刪事件時用得到（特別是新舊架構共存期間）
-- 套用方式：到 Supabase Dashboard → SQL Editor → 貼上執行

ALTER TABLE picosure_consultation
  ADD COLUMN IF NOT EXISTS gcal_calendar_id TEXT;

COMMENT ON COLUMN picosure_consultation.gcal_calendar_id IS
  '事件實際寫入的 Google Calendar ID（BOOKING 日曆或舊架構的混合院區日曆）';

-- 若另外還有 picosure_appointments 表也用到 gcal_event_id，同步補上：
-- ALTER TABLE picosure_appointments
--   ADD COLUMN IF NOT EXISTS gcal_calendar_id TEXT;
