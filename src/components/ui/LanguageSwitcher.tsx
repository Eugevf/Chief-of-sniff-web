import { LANGS, type Lang } from '@/i18n'
import { useI18n } from '@/i18n/LanguageContext'

const NAMES: Record<Lang, string> = {
  es: 'Español', en: 'English', ca: 'Català', fr: 'Français',
  it: 'Italiano', de: 'Deutsch', pt: 'Português',
}

/** Compact language picker: with seven languages the old pill group no longer fits. */
export function LanguageSwitcher() {
  const { lang, setLang } = useI18n()
  return (
    <div className="relative">
      <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} aria-label="Idioma"
        className="cursor-pointer appearance-none rounded-pill border border-line bg-sage py-2 pl-3.5 pr-8 text-[0.85rem] font-semibold text-navy outline-none transition-colors hover:border-navy focus:border-blue">
        {LANGS.map((l) => (
          <option key={l} value={l}>{NAMES[l]}</option>
        ))}
      </select>
      <svg viewBox="0 0 12 12" aria-hidden
        className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-muted"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 4.5 6 8l3.5-3.5" />
      </svg>
    </div>
  )
}
