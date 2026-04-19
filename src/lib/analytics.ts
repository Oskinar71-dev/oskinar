const DOMAIN = import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN ?? 'oskinar.es'
const API    = import.meta.env.PUBLIC_PLAUSIBLE_API    ?? 'https://plausible.io'

export function plausibleScript(): string {
  return `<script defer data-domain="${DOMAIN}" src="${API}/js/script.js"></script>`
}

export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window === 'undefined') return
  ;(window as any).plausible?.(name, { props })
}
