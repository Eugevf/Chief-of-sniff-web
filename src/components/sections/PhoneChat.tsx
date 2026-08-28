import { useEffect, useRef, useState } from 'react'
import logoIso from '@/assets/logo-iso.png'
import { useI18n } from '@/i18n/LanguageContext'

/**
 * Signature element: an animated WhatsApp thread that types itself out,
 * message by message, then loops. Honours prefers-reduced-motion.
 */
export function PhoneChat() {
  const { t } = useI18n()
  const msgs = t.chat.messages
  const [shown, setShown] = useState(0)
  const [typing, setTyping] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setShown(msgs.length); return }

    const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }
    let i = 0
    const step = () => {
      if (i >= msgs.length) {
        setTyping(false)
        timers.current.push(window.setTimeout(() => { i = 0; setShown(0); step() }, 5000))
        return
      }
      const isIn = msgs[i].from === 'in'
      if (isIn) setTyping(true)
      timers.current.push(window.setTimeout(() => {
        setTyping(false)
        setShown((n) => n + 1)
        i += 1
        timers.current.push(window.setTimeout(step, isIn ? 650 : 950))
      }, isIn ? 1200 : 450))
    }
    timers.current.push(window.setTimeout(step, 500))
    return clear
    // re-run when language changes so the new script plays
  }, [msgs])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [shown, typing])

  return (
    <div className="mx-auto w-[min(350px,100%)] rounded-[40px] bg-navy p-3 shadow-phone">
      <div className="flex h-[600px] flex-col overflow-hidden rounded-[30px] bg-chat-bg">
        <div className="flex items-center gap-3 bg-navy px-4 pb-3 pt-3.5 text-white">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-blue-sky bg-white">
            <img src={logoIso} alt="" className="h-full w-full scale-[1.35] object-cover object-[center_60%]" />
          </div>
          <div>
            <div className="text-[0.92rem] font-semibold leading-tight">{t.chat.name}</div>
            <div className="text-[0.72rem] opacity-75">{t.chat.status}</div>
          </div>
        </div>

        <div ref={bodyRef} className="flex flex-1 flex-col gap-2 overflow-hidden p-3">
          {msgs.slice(0, shown).map((m, idx) => (
            <div key={idx}
              className={[
                'max-w-[84%] animate-bubble-in rounded-xl px-3 pb-1.5 pt-2.5 text-[0.86rem] font-medium leading-snug shadow-[0_1px_1px_rgba(13,27,42,.08)]',
                m.from === 'in'
                  ? 'self-start rounded-tl-[4px] bg-bubble-in'
                  : 'self-end rounded-tr-[4px] bg-chat-out',
              ].join(' ')}>
              <span dangerouslySetInnerHTML={{ __html: m.html }} />
              <span className="mt-0.5 block text-right text-[0.64rem] text-muted">{m.time}</span>
            </div>
          ))}
          {typing && (
            <div className="flex gap-1 self-start rounded-xl bg-bubble-in px-3.5 py-2.5 shadow-[0_1px_1px_rgba(13,27,42,.08)]">
              {[0, 1, 2].map((i) => (
                <i key={i} className="h-1.5 w-1.5 animate-blink rounded-full bg-[#9AAABB]"
                  style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 bg-[#F0F0F0] px-3 py-2.5">
          <div className="flex-1 rounded-pill bg-white px-3.5 py-2.5 text-[0.82rem] text-[#8a97a5]">{t.chat.input}</div>
          <span className="grid h-[38px] w-[38px] place-items-center rounded-full bg-blue" aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}
