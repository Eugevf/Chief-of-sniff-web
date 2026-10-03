import { useState } from 'react'
import logoIso from '@/assets/logo-iso.png'
import { useI18n } from '@/i18n/LanguageContext'
import { Button } from '@/components/ui/Button'
import { NoseIcon } from '@/components/ui/icons'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { navigate, type Route } from '@/lib/useHashRoute'
import { cn } from '@/lib/cn'

export function Header({ route, onLogin, onWaitlist }: { route: Route; onLogin: () => void; onWaitlist: () => void }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const links: { to: Route; label: string }[] = [
    { to: '/', label: t.nav.how },
    { to: '/precios', label: t.nav.pricing },
    { to: '/preguntas', label: t.nav.faq },
  ]
  const go = (to: Route) => { navigate(to); setOpen(false) }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-sage/90 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-[76px] max-w-content items-center justify-between gap-6 px-6">
        <button onClick={() => go('/')} className="flex items-center gap-2.5" aria-label="Chief of Sniff, inicio">
          <img src={logoIso} alt="" className="h-11 w-auto" />
          <span className="font-display text-[1.3rem] font-extrabold tracking-tight">Chief of Sniff</span>
        </button>

        <nav className="hidden gap-[30px] text-[0.98rem] font-medium md:flex" aria-label="Principal">
          {links.map((l) => (
            <button key={l.to} onClick={() => go(l.to)}
              className={cn('border-b-2 py-1.5 transition-colors',
                route === l.to ? 'border-blue' : 'border-transparent hover:border-blue')}>
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Button variant="ghost" size="sm" onClick={onLogin} className="max-md:hidden">{t.cta.login}</Button>
          <Button variant="primary" size="sm" onClick={onWaitlist} className="group max-md:hidden">
            <NoseIcon className="h-[18px] w-[18px] group-hover:animate-sniff" />{t.cta.start}
          </Button>
          <LanguageSwitcher />
          <button className="grid h-11 w-11 place-items-center md:hidden" aria-label="Menú"
            onClick={() => setOpen((v) => !v)}>
            <span className="relative block h-0.5 w-[22px] bg-navy before:absolute before:-top-[7px] before:block before:h-0.5 before:w-[22px] before:bg-navy before:content-[''] after:absolute after:top-[7px] after:block after:h-0.5 after:w-[22px] after:bg-navy after:content-['']" />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-sage px-6 pb-5 pt-3 md:hidden">
          {links.map((l) => (
            <button key={l.to} onClick={() => go(l.to)}
              className="block w-full border-b border-line py-3 text-left font-medium">{l.label}</button>
          ))}
          <Button variant="primary" onClick={() => { setOpen(false); onWaitlist() }}
            className="group mt-3.5 w-full">
            <NoseIcon className="h-[18px] w-[18px] group-hover:animate-sniff" />{t.cta.start}
          </Button>
        </div>
      )}
    </header>
  )
}
