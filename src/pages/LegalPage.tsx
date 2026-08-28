import { useI18n } from '@/i18n/LanguageContext'

/** Renders Terms or Privacy from the localized legal HTML. */
export function LegalPage({ kind }: { kind: 'terms' | 'privacy' }) {
  const { t } = useI18n()
  const bodyHtml = kind === 'terms' ? t.legal.terms : t.legal.privacy
  return (
    <section className="py-24">
      <div className="legal-page mx-auto max-w-[820px] px-6" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </section>
  )
}
