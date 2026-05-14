import posthog from 'posthog-js'

export default defineNuxtPlugin((nuxtApp) => {
  const { posthogKey, posthogHost, siteName } = useRuntimeConfig().public

  if (!posthogKey) return

  posthog.init(posthogKey as string, {
    api_host: (posthogHost as string) || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false,
    autocapture: {
      dom_event_allowlist: ['click', 'submit'],
      element_allowlist: ['button', 'a'],
    },
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '[data-ph-no-capture], input, textarea',
    },
    loaded: (ph) => {
      if (siteName) ph.register({ site: siteName })
    },
  })

  const router = useRouter()
  router.afterEach((to) => {
    nextTick(() => {
      posthog.capture('$pageview', {
        $current_url: window.location.href,
        path: to.path,
      })
    })
  })

  return {
    provide: {
      posthog,
    },
  }
})
