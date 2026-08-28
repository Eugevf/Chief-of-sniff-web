import { useState } from 'react'
import { useI18n } from '@/i18n/LanguageContext'
import { ButtonLink } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { whatsappHref } from '@/lib/config'
import { cn } from '@/lib/cn'

export function FaqPage() {
  const { t } = useI18n()
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="py-24">
      <div className="mx-auto max-w-content px-6">
        <div className="mb-10 max-w-[680px]">
          <Eyebrow>{t.faq.eyebrow}</Eyebrow>
          <h1 className="my-3.5 text-[clamp(2.4rem,4.5vw,3.6rem)]">{t.faq.title}</h1>
          <p className="text-[1.1rem] text-muted">{t.faq.body}</p>
        </div>

        <div className="grid max-w-[800px] gap-2.5">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={i} className={cn('rounded-2xl border bg-white', isOpen ? 'border-blue-sky' : 'border-line')}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 p-[20px_22px] text-left font-display text-[1.15rem] font-semibold">
                  <span>{item.q}</span>
                  <span className={cn('grid h-[30px] w-[30px] shrink-0 place-items-center rounded-full border-2 text-[1.1rem] transition-transform',
                    isOpen ? 'rotate-45 border-blue bg-blue text-white' : 'border-line text-blue')}>+</span>
                </button>
                {isOpen && <div className="max-w-[64ch] px-[22px] pb-[22px] text-[0.97rem] text-muted">{item.a}</div>}
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex max-w-[800px] flex-wrap items-center justify-between gap-5 rounded-2xl border border-line bg-sage p-7">
          <div><strong>{t.faq.ctaTitle}</strong><br /><span className="text-muted">{t.faq.ctaBody}</span></div>
          <ButtonLink href={whatsappHref()} target="_blank" rel="noopener">{t.faq.cta}</ButtonLink>
        </div>
      </div>
    </section>
  )
}
