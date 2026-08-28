import logoFull from '@/assets/logo-full.png'
import { useI18n } from '@/i18n/LanguageContext'
import { whatsappHref } from '@/lib/config'
import { navigate, type Route } from '@/lib/useHashRoute'

export function Footer({ onLogin }: { onLogin: () => void }) {
  const { t } = useI18n()
  const go = (r: Route) => navigate(r)
  return (
    <footer className="bg-sage-2 py-14 pb-8 border-t border-line">
      <div className="mx-auto grid max-w-content gap-8 px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <button onClick={() => go('/')} aria-label="Chief of Sniff"><img src={logoFull} alt="Chief of Sniff" className="h-[150px] w-auto" /></button>
          <p className="mt-3.5 max-w-[32ch] text-[0.98rem] text-muted">{t.footer.tagline}</p>
        </div>
        <FooterCol title={t.footer.product}>
          <FooterLink onClick={() => go('/')}>{t.footer.links.how}</FooterLink>
          <FooterLink onClick={() => go('/precios')}>{t.footer.links.pricing}</FooterLink>
          <FooterLink onClick={() => go('/preguntas')}>{t.footer.links.faq}</FooterLink>
        </FooterCol>
        <FooterCol title={t.footer.account}>
          <FooterLink onClick={onLogin}>{t.footer.links.login}</FooterLink>
          <FooterAnchor href={whatsappHref()}>{t.footer.links.start}</FooterAnchor>
        </FooterCol>
        <FooterCol title={t.footer.legal}>
          <FooterLink onClick={() => go('/privacidad')}>{t.footer.links.privacy}</FooterLink>
          <FooterLink onClick={() => go('/terminos')}>{t.footer.links.terms}</FooterLink>
          <FooterLink onClick={() => go('/privacidad')}>{t.footer.links.cookies}</FooterLink>
        </FooterCol>
      </div>
      <div className="mx-auto mt-10 flex max-w-content flex-wrap justify-between gap-3 border-t border-line px-6 pt-6 text-[0.82rem] text-muted">
        <span>{t.footer.copyright}</span>
        <span>{t.footer.disclaimer}</span>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h5 className="mb-3.5 text-[0.74rem] font-bold uppercase tracking-[0.14em] text-muted">{title}</h5>
      <ul className="grid gap-2.5 text-[0.98rem]">{children}</ul>
    </div>
  )
}
function FooterLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <li><button onClick={onClick} className="opacity-85 hover:opacity-100 hover:underline">{children}</button></li>
}
function FooterAnchor({ children, href }: { children: React.ReactNode; href: string }) {
  return <li><a href={href} target="_blank" rel="noopener" className="opacity-85 hover:opacity-100 hover:underline">{children}</a></li>
}
