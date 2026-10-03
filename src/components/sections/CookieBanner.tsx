import { useEffect, useState } from 'react'
import { useI18n } from '@/i18n/LanguageContext'
import { Button } from '@/components/ui/Button'
import { navigate } from '@/lib/useHashRoute'
import { getConsent, saveConsent, onCookieBannerOpen } from '@/lib/cookieConsent'

/**
 * GDPR/AEPD consent banner: reject is as prominent as accept, no consent wall,
 * nothing non-essential runs until the visitor chooses. Shown until a choice
 * is stored; re-opened from the cookies page via openCookieBanner().
 */
export function CookieBanner() {
  const { t } = useI18n()
  const [open, setOpen] = useState(() => getConsent() === null)
  useEffect(() => onCookieBannerOpen(() => setOpen(true)), [])
  if (!open) return null

  const choose = (analytics: boolean) => { saveConsent(analytics); setOpen(false) }

  return (
    <div role="region" aria-label={t.cookies.title} className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-content rounded-card border border-line bg-white p-5 shadow-card sm:flex sm:items-center sm:gap-6 sm:p-6">
        <p className="text-[0.95rem] leading-relaxed">
          <strong className="font-display font-bold">{t.cookies.title}.</strong>{' '}
          {t.cookies.body}{' '}
          <button onClick={() => navigate('/cookies')} className="font-semibold text-blue underline underline-offset-2 hover:text-blue-dark">
            {t.cookies.more}
          </button>
        </p>
        <div className="mt-4 flex shrink-0 flex-wrap gap-2.5 sm:mt-0">
          <Button variant="ghost" size="sm" onClick={() => choose(false)}>{t.cookies.reject}</Button>
          <Button variant="primary" size="sm" onClick={() => choose(true)}>{t.cookies.accept}</Button>
        </div>
      </div>
    </div>
  )
}
