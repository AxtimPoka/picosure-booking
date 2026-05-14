import type posthog from 'posthog-js'

export const usePosthog = () => {
  const { $posthog } = useNuxtApp()
  return $posthog as typeof posthog | undefined
}
