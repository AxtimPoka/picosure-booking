// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  runtimeConfig: {
    supabaseUrl: '',
    supabaseServiceRoleKey: '',
    googleServiceAccountJson: '',
    gcalCalendarId: '',
    gcalCalendarIdTaipei: '',
    gcalCalendarIdTaichung: '',
    gcalCalendarIdKaohsiung: '',
    lineChannelAccessToken: '',
    lineStaffGroupId: '',
    lineStaffGroupIdKaohsiung: '',
    lineStaffGroupIdTaipei: '',
    lineStaffGroupIdTaichung: '',
  },

  app: {
    head: {
      title: '璧時尚醫美診所 · PicoSure 預約',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '璧時尚醫美診所線上 PicoSure 預約系統' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/befashion-favicon-32x32.ico' },
      ],
    },
  },

  compatibilityDate: '2025-01-01',
})
