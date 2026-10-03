/**
 * Runtime configuration. Set these before deploying.
 * WA_NUMBER: WhatsApp Business number, digits only, no + or spaces.
 */
export const WA_NUMBER = ''
export const WA_TEXT = 'Hola, quiero empezar con Chief of Sniff'

export const INSTAGRAM_URL = 'https://www.instagram.com/chiefofsniff'
export const TIKTOK_URL = 'https://www.tiktok.com/@chiefofsniff'

/**
 * Supabase, used only to insert waitlist signups. Set in .env (local) and in
 * the Vercel project settings (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).
 * The anon key is public by design: it ships in the bundle, and row-level
 * security only lets it INSERT into waitlist_entries (no reads, no other tables).
 */
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? ''
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

export function whatsappHref(text: string = WA_TEXT): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}
