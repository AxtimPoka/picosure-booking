import { createClient } from '@supabase/supabase-js'

export function getSupabaseClient() {
  const config = useRuntimeConfig()
  return createClient(config.supabaseUrl, config.supabaseServiceRoleKey)
}
