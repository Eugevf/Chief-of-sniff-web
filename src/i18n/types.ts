export type Lang = 'es' | 'en' | 'ca'

export interface Feature { text: string }
export interface Beat { kicker: string; title: string; body: string }
export interface AlertCard { title: string; body: string; suggests: string }
export interface Provider { title: string; body: string }
export interface AfterCard { title: string; body: string; soon?: boolean; soonLabel?: string }
export interface Pet { initial: string; name: string; meta: string }
export interface Person { initial: string; name: string; meta: string }
export interface Review { quote: string; name: string; meta: string; initial: string }
export interface Plan {
  name: string; forWhom: string; priceMonth: string; priceYear: string; yearNote: string
  features: string[]; cta: string; highlighted?: boolean; popLabel?: string
}
export interface Faq { q: string; a: string }

export interface Content {
  nav: { how: string; pricing: string; faq: string }
  cta: { start: string; login: string; seeHow: string }
  hero: { eyebrow: string; titleLead: string; titleMark: string; lead: string; notes: string[] }
  chat: { name: string; status: string; input: string; messages: { from: 'in' | 'out'; html: string; time: string }[] }
  features: Feature[]
  how: { eyebrow: string; title: string; body: string; beats: Beat[] }
  alerts: { eyebrow: string; title: string; body: string; cards: AlertCard[]; note: string }
  booking: { eyebrow: string; title: string; body: string; steps: string[]; providers: Provider[] }
  after: { eyebrow: string; title: string; cards: AfterCard[] }
  household: { eyebrow: string; title: string; body: string; points: string[]; homeLabel: string; peopleLabel: string; pets: Pet[]; people: Person[] }
  reviews: { eyebrow: string; title: string; items: Review[] }
  band: { title: string; body: string; cta: string; note: string }
  pricing: { eyebrow: string; title: string; body: string; monthly: string; yearly: string; yearlySave: string; plans: Plan[]; fine: string; includedTitle: string; included: { title: string; body: string }[] }
  faq: { eyebrow: string; title: string; body: string; items: Faq[]; ctaTitle: string; ctaBody: string; cta: string }
  footer: { tagline: string; product: string; account: string; legal: string; links: { how: string; pricing: string; faq: string; login: string; start: string; privacy: string; terms: string; cookies: string }; copyright: string; disclaimer: string }
  login: { title: string; body: string; send: string; alt: string; altLink: string; okTitle: string; okBody: string; close: string }
  waitlist: {
    announceTitle: string; announceBody: string
    title: string; firstName: string; lastName: string; email: string; phone: string
    privacy: string; privacyLink: string; submit: string; sending: string
    okTitle: string; okBody: string; dupBody: string; errBody: string; invalid: string; close: string
  }
  cookies: { title: string; body: string; accept: string; reject: string; more: string; change: string }
  legal: { termsTitle: string; privacyTitle: string; updated: string; terms: string; privacy: string; cookies: string }
}
