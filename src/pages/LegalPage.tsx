import { useI18n } from '@/i18n/LanguageContext'
import { Button } from '@/components/ui/Button'
import { clearConsent, openCookieBanner } from '@/lib/cookieConsent'

/** Renders Terms, Privacy or the Cookie policy from the localized legal HTML. */
export function LegalPage({ kind }: { kind: 'terms' | 'privacy' | 'cookies' }) {
  const { t } = useI18n()
  const bodyHtml = kind === 'terms' ? t.legal.terms : kind === 'privacy' ? t.legal.privacy : t.legal.cookies
  return (
    <section className="py-24">
      <div className="legal-page mx-auto max-w-[820px] px-6" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      {kind === 'cookies' && (
        <div className="mx-auto max-w-[820px] px-6 pt-8">
          <Button variant="ghost" size="sm" onClick={() => { clearConsent(); openCookieBanner() }}>
            {t.cookies.change}
          </Button>
        </div>
      )}
    </section>
  )
}
