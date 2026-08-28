import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { dictionaries, type Content, type Lang } from './index'

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: Content }
const LanguageContext = createContext<Ctx | null>(null)

const STORAGE_KEY = 'cos_lang'
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null
    if (saved && saved in dictionaries) return saved
  } catch { /* ignore */ }
  return 'es'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem(STORAGE_KEY, l) } catch { /* ignore */ }
  }
  useEffect(() => { document.documentElement.lang = lang }, [lang])
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

/** Access the current language, setter, and the active content dictionary. */
export function useI18n(): Ctx {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>')
  return ctx
}
