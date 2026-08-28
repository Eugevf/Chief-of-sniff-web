/**
 * Runtime configuration. Set these before deploying.
 * WA_NUMBER: WhatsApp Business number, digits only, no + or spaces.
 */
export const WA_NUMBER = ''
export const WA_TEXT = 'Hola, quiero empezar con Chief of Sniff'

export function whatsappHref(text: string = WA_TEXT): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}
