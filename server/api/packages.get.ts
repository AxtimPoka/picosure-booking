import { getSupabaseClient } from '~/utils/supabase'

export default defineEventHandler(async () => {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('price', { ascending: true })

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  return data
})
