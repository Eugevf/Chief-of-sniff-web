import { useState } from 'react'
import { useI18n } from '@/i18n/LanguageContext'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { CheckIcon } from '@/components/ui/icons'
import { whatsappHref } from '@/lib/config'
import { cn } from '@/lib/cn'

export function PricingPage() {
  const { t, lang } = useI18n()
  const [yearly, setYearly] = useState(false)
  const unit = ({ es: ['año', 'mes'], en: ['yr', 'mo'], ca: ['any', 'mes'] } as const)[lang]

  return (
    <section className="py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="mx-auto mb-10 max-w-[660px] text-center">
          <Eyebrow center>{t.pricing.eyebrow}</Eyebrow>
          <h1 className="my-3.5 text-[clamp(2.4rem,4.5vw,3.6rem)]">{t.pricing.title}</h1>
          <p className="text-[1.1rem] text-muted">{t.pricing.body}</p>
        </div>

        <div className="text-center">
          <div className="inline-flex gap-1 rounded-pill border border-line bg-sage p-1" role="group">
            <button onClick={() => setYearly(false)}
              className={cn('rounded-pill px-[18px] py-2.5 text-[0.95rem] font-semibold', !yearly ? 'bg-navy text-white' : 'text-muted')}>
              {t.pricing.monthly}
            </button>
            <button onClick={() => setYearly(true)}
              className={cn('rounded-pill px-[18px] py-2.5 text-[0.95rem] font-semibold', yearly ? 'bg-navy text-white' : 'text-muted')}>
              {t.pricing.yearly} <span className="ml-1.5 rounded-pill bg-blue-sky px-2 py-0.5 text-[0.72rem] font-bold text-navy">{t.pricing.yearlySave}</span>
            </button>
          </div>
        </div>

        <div className="mx-auto mt-9 grid max-w-[880px] gap-6 md:grid-cols-2">
          {t.pricing.plans.map((p) => (
            <div key={p.name}
              className={cn('flex flex-col rounded-xl2 border bg-white p-9',
                p.highlighted ? 'relative border-2 border-blue bg-sage' : 'border-line')}>
              {p.highlighted && p.popLabel && (
                <span className="absolute -top-3.5 left-9 rounded-pill bg-blue px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-white">{p.popLabel}</span>
              )}
              <h3 className="mb-1.5 text-[1.6rem]">{p.name}</h3>
              <p className="mb-5.5 min-h-12 text-[0.95rem] text-muted" style={{ marginBottom: '22px' }}>{p.forWhom}</p>
              <div className="font-display text-[3.2rem] font-extrabold leading-none tracking-tight">
                {yearly ? p.priceYear : p.priceMonth}{' '}
                <small className="font-body text-base font-medium text-muted">€ / {yearly ? unit[0] : unit[1]}</small>
              </div>
              <div className="mb-6.5 mt-2 min-h-5 text-[0.88rem] font-semibold text-blue" style={{ marginBottom: '26px' }}>{yearly ? p.yearNote : ''}</div>
              <ul className="mb-7.5 grid gap-2.5" style={{ marginBottom: '30px' }}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[0.97rem]">
                    <CheckIcon className="mt-[3px] h-[18px] w-[18px] shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <ButtonLink variant={p.highlighted ? 'primary' : 'ghost'} href={whatsappHref()} target="_blank" rel="noopener"
                className="mt-auto w-full">{p.cta}</ButtonLink>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-7 max-w-[720px] text-center text-[0.9rem] text-muted">{t.pricing.fine}</p>

        <div className="mx-auto mt-16 max-w-[880px] border-t border-line pt-12">
          <h2 className="mb-6 text-[1.8rem]">{t.pricing.includedTitle}</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {t.pricing.included.map((i) => (
              <div key={i.title} className="border-l-[3px] border-blue-sky pl-5">
                <h4 className="mb-1.5 font-display text-[1.1rem] font-bold">{i.title}</h4>
                <p className="text-[0.93rem] text-muted">{i.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export { Button }
