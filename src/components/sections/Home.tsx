import { useI18n } from '@/i18n/LanguageContext'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Stars } from '@/components/ui/Stars'
import { PhoneChat } from './PhoneChat'
import { whatsappHref } from '@/lib/config'
import {
  WhatsAppIcon, CheckCircleIcon,
  VetIcon, PuppyIcon, SunIcon, VaccineIcon, ScissorsIcon, PawIcon, HomeIcon, PillIcon, DocIcon, BagIcon,
} from '@/components/ui/icons'
import type { ReactNode } from 'react'

function html(s: string) { return <span dangerouslySetInnerHTML={{ __html: s }} /> }

/* ---------- Hero ---------- */
function Hero({ onLogin: _o }: { onLogin: () => void }) {
  const { t } = useI18n()
  return (
    <section className="py-[72px] pb-12">
      <div className="mx-auto grid max-w-content items-center gap-14 px-6 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          <h1 className="my-5 text-[clamp(2.7rem,5.4vw,4.6rem)] font-extrabold">
            {t.hero.titleLead} <span className="mark-cheese">{t.hero.titleMark}</span>
          </h1>
          <p className="mb-[30px] max-w-[50ch] text-[1.2rem] text-muted">{t.hero.lead}</p>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href={whatsappHref()} target="_blank" rel="noopener">
              <WhatsAppIcon className="h-[18px] w-[18px]" />{t.cta.start}
            </ButtonLink>
            <Button variant="ghost" onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.cta.seeHow}
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap gap-5 text-[0.9rem] text-muted">
            {t.hero.notes.map((n) => (
              <span key={n} className="before:mr-2 before:inline-block before:h-[7px] before:w-[7px] before:rounded-full before:bg-blue-sky before:align-middle before:content-['']">{n}</span>
            ))}
          </div>
        </div>
        <PhoneChat />
      </div>
    </section>
  )
}

/* ---------- Feature strip ---------- */
function FeatureStrip() {
  const { t } = useI18n()
  const icons = [DocIcon, VaccineIcon, HomeIcon, PuppyIcon]
  return (
    <div className="pb-6 pt-2">
      <div className="mx-auto grid max-w-content gap-5 border-t border-line px-6 pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {t.features.map((f, i) => {
          const Icon = icons[i]
          return (
            <div key={i} className="flex items-start gap-3.5">
              <Icon className="h-10 w-10 shrink-0" />
              <p className="pt-1.5 text-[0.98rem] font-semibold leading-snug">{f.text}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- Section header ---------- */
function SecHead({ eyebrow, title, body, onDark }: { eyebrow: string; title: ReactNode; body?: string; onDark?: boolean }) {
  return (
    <div className="mb-12 max-w-[680px]">
      <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
      <h2 className="my-3.5 text-[clamp(2rem,3.6vw,2.9rem)]">{title}</h2>
      {body && <p className={`text-[1.1rem] ${onDark ? 'text-white/80' : 'text-muted'}`}>{body}</p>}
    </div>
  )
}

/* ---------- How it works ---------- */
function HowItWorks() {
  const { t } = useI18n()
  return (
    <section id="como-funciona" className="border-y border-line bg-white py-24">
      <div className="mx-auto max-w-content px-6">
        <SecHead eyebrow={t.how.eyebrow} title={t.how.title} body={t.how.body} />
        <div className="grid overflow-hidden rounded-[22px] border border-line bg-line md:grid-cols-3 gap-px">
          {t.how.beats.map((b, i) => {
            const hi = i === 2
            return (
              <div key={i} className={`flex flex-col gap-3 p-[34px_30px] ${hi ? 'bg-navy text-white' : 'bg-white'}`}>
                <span className={`font-display text-[0.8rem] font-extrabold uppercase tracking-[0.14em] ${hi ? 'text-cheese' : 'text-blue'}`}>{b.kicker}</span>
                <h3 className="text-[1.7rem]">{b.title}</h3>
                <p className={hi ? 'text-white/80' : 'text-muted'}>{b.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Alerts ---------- */
function Alerts() {
  const { t } = useI18n()
  const icons = [VetIcon, PuppyIcon, SunIcon, VaccineIcon]
  return (
    <section className="py-24">
      <div className="mx-auto max-w-content px-6">
        <SecHead eyebrow={t.alerts.eyebrow} title={t.alerts.title} body={t.alerts.body} />
        <div className="grid gap-4.5 md:grid-cols-2" style={{ gap: '18px' }}>
          {t.alerts.cards.map((c, i) => {
            const Icon = icons[i]
            return (
              <div key={i} className="flex gap-5 rounded-card border border-line bg-white p-7">
                <Icon className="h-[52px] w-[52px] shrink-0" />
                <div>
                  <h3 className="mb-2 text-[1.35rem]">{c.title}</h3>
                  <p className="text-[0.97rem] text-muted">{c.body}</p>
                  <p className="mt-3.5 text-[0.88rem] font-semibold text-navy">
                    <b className="font-bold text-blue">{c.suggests.split(':')[0]}:</b>{c.suggests.split(':').slice(1).join(':')}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <p className="mt-5.5 text-[0.9rem] text-muted" style={{ marginTop: '22px' }}>{t.alerts.note}</p>
      </div>
    </section>
  )
}

/* ---------- Booking (dark) ---------- */
function Booking() {
  const { t } = useI18n()
  const icons = [VetIcon, ScissorsIcon, PawIcon, HomeIcon]
  return (
    <section className="bg-navy py-24 text-white">
      <div className="mx-auto max-w-content px-6">
        <SecHead eyebrow={t.booking.eyebrow} title={t.booking.title} body={t.booking.body} onDark />
        <div className="grid gap-14 md:grid-cols-[0.95fr_1.05fr]">
          <ol className="grid gap-[18px]" style={{ counterReset: 'step' }}>
            {t.booking.steps.map((s, i) => (
              <li key={i} className="flex items-start gap-4 text-[1.02rem] leading-relaxed">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cheese font-display font-extrabold text-navy">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <div className="grid gap-3.5 sm:grid-cols-2">
            {t.booking.providers.map((p, i) => {
              const Icon = icons[i]
              return (
                <div key={i} className="rounded-[18px] border border-white/10 bg-navy-2 p-[22px]">
                  <Icon tone="onDark" className="mb-3 h-10 w-10" />
                  <h3 className="mb-1.5 text-[1.15rem]">{p.title}</h3>
                  <p className="text-[0.9rem] text-white/[0.78]">{p.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- After the appointment ---------- */
function After() {
  const { t } = useI18n()
  const icons = [PillIcon, DocIcon, BagIcon]
  return (
    <section className="py-24">
      <div className="mx-auto max-w-content px-6">
        <SecHead eyebrow={t.after.eyebrow} title={t.after.title} />
        <div className="grid gap-5 md:grid-cols-3">
          {t.after.cards.map((c, i) => {
            const Icon = icons[i]
            return (
              <div key={i} className={`flex flex-col rounded-card border bg-white p-[26px] ${c.soon ? 'border-dashed border-line' : 'border-line'}`}>
                {c.soon && <span className="mb-3 self-start rounded-[5px] bg-cheese-soft px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-[#7A5A0E]">{c.soonLabel}</span>}
                <Icon className="mb-3.5 h-11 w-11" />
                <h3 className="mb-2 text-[1.3rem]">{c.title}</h3>
                <p className="flex-1 text-[0.95rem] text-muted">{c.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Household (dark blue) ---------- */
function Household() {
  const { t } = useI18n()
  return (
    <section className="bg-navy py-24 text-white">
      <div className="mx-auto grid max-w-content items-center gap-14 px-6 md:grid-cols-2">
        <div>
          <Eyebrow onDark>{t.household.eyebrow}</Eyebrow>
          <h2 className="my-4 text-[clamp(2rem,3.6vw,2.9rem)]">{t.household.title}</h2>
          <p className="text-[1.1rem] text-white/85">{t.household.body}</p>
          <ul className="mt-5.5 grid gap-3" style={{ marginTop: '22px' }}>
            {t.household.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[1.02rem]">
                <CheckCircleIcon tone="onDark" className="mt-px h-[22px] w-[22px] shrink-0" />{p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl2 border border-blue-sky/25 bg-navy-2 p-7">
          <p className="mb-1.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-cheese">{t.household.homeLabel}</p>
          {t.household.pets.map((p) => (
            <div key={p.name} className="flex items-center gap-3.5 border-b border-white/[0.08] py-3.5 last:border-0">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-cheese font-display font-extrabold text-navy">{p.initial}</span>
              <div><div className="font-semibold">{p.name}</div><div className="text-[0.88rem] opacity-70">{p.meta}</div></div>
            </div>
          ))}
          <p className="mb-1.5 mt-5.5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-cheese" style={{ marginTop: '22px' }}>{t.household.peopleLabel}</p>
          {t.household.people.map((p) => (
            <div key={p.name} className="flex items-center gap-3.5 border-b border-white/[0.08] py-3.5 last:border-0">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white font-display font-extrabold text-navy">{p.initial}</span>
              <div><div className="font-semibold">{p.name}</div><div className="text-[0.88rem] opacity-70">{p.meta}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Reviews ---------- */
function Reviews() {
  const { t } = useI18n()
  return (
    <section className="py-24">
      <div className="mx-auto max-w-content px-6">
        <SecHead eyebrow={t.reviews.eyebrow} title={t.reviews.title} />
        <div className="grid gap-5 md:grid-cols-3">
          {t.reviews.items.map((r, i) => (
            <figure key={i} className="m-0 flex flex-col gap-5.5 rounded-card border border-line bg-white p-7" style={{ gap: '22px' }}>
              <Stars />
              <blockquote className="flex-1 text-[1.02rem] leading-relaxed text-navy">{r.quote}</blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cheese-soft font-display font-extrabold text-blue">{r.initial}</span>
                <div><b className="block font-bold">{r.name}</b><small className="text-[0.85rem] text-muted">{r.meta}</small></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- CTA band ---------- */
function Band() {
  const { t } = useI18n()
  return (
    <div className="pb-24">
      <div className="mx-auto max-w-content px-6">
        <div className="relative grid items-center gap-8 overflow-hidden rounded-[28px] bg-blue px-[52px] py-16 text-white md:grid-cols-[1.2fr_0.8fr] max-md:px-7 max-md:py-11">
          <div>
            <h2 className="mb-3 text-[clamp(2rem,3.6vw,3rem)]">{t.band.title}</h2>
            <p className="text-[1.1rem] opacity-90">{t.band.body}</p>
          </div>
          <div className="relative z-10 flex flex-col items-start gap-3">
            <ButtonLink variant="white" href={whatsappHref()} target="_blank" rel="noopener">{t.band.cta}</ButtonLink>
            <small className="opacity-80">{t.band.note}</small>
          </div>
          <span className="pointer-events-none absolute -bottom-[120px] -right-20 h-80 w-80 rounded-full bg-cheese opacity-[0.18]" />
        </div>
      </div>
    </div>
  )
}

export function HomePage({ onLogin }: { onLogin: () => void }) {
  return (
    <>
      <Hero onLogin={onLogin} />
      <FeatureStrip />
      <HowItWorks />
      <Alerts />
      <Booking />
      <After />
      <Household />
      <Reviews />
      <Band />
    </>
  )
}
export { html }
