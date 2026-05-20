export default defineNuxtPlugin(() => {
  const { metaPixelId } = useRuntimeConfig().public

  if (!metaPixelId) return

  ;(function (f: any, b: any, e: any, v: any) {
    if (f.fbq) return
    const n: any = (f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments)
    })
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    const t = b.createElement(e)
    t.async = true
    t.src = v
    const s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  window.fbq('init', metaPixelId as string)
  window.fbq('track', 'PageView')

  const router = useRouter()
  router.afterEach(() => {
    nextTick(() => {
      window.fbq?.('track', 'PageView')
    })
  })
})
