/**
 * Cookie consent state. Stored in localStorage (itself strictly necessary,
 * so it needs no prior consent). Analytics must stay off until `analytics`
 * is explicitly true — check `getConsent()?.analytics` before loading any tracker.
 */
export type CookieConsent = { v: 1; necessary: true; analytics: boolean; ts: string }

const STORAGE_KEY = 'cos_cookie_consent'
const OPEN_EVENT = 'cos:cookie-preferences'

export function getConsent(): CookieConsent | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CookieConsent) : null
  } catch {
    return null
  }
}

export function saveConsent(analytics: boolean) {
  const consent: CookieConsent = { v: 1, necessary: true, analytics, ts: new Date().toISOString() }
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(consent)) } catch { /* ignore */ }
}

export function clearConsent() {
  try { localStorage.removeItem(STORAGE_KEY) } catch { /* ignore */ }
}

/** Re-opens the banner (used by the "change my choice" button on the cookies page). */
export function openCookieBanner() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function onCookieBannerOpen(handler: () => void): () => void {
  window.addEventListener(OPEN_EVENT, handler)
  return () => window.removeEventListener(OPEN_EVENT, handler)
}
