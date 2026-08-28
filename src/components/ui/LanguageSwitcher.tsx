import { LANGS } from '@/i18n'
import { useI18n } from '@/i18n/LanguageContext'
import { cn } from '@/lib/cn'

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n()
  return (
    <div className="flex gap-0.5 rounded-pill border border-line bg-sage p-[3px]" role="group" aria-label="Idioma">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            'rounded-pill px-[11px] py-1.5 text-[0.78rem] font-bold uppercase tracking-[0.03em] transition-colors',
            lang === l ? 'bg-navy text-white' : 'text-muted hover:text-navy',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
