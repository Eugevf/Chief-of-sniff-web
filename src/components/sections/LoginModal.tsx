import { useEffect, useState } from 'react'
import logoFull from '@/assets/logo-full.png'
import { useI18n } from '@/i18n/LanguageContext'
import { Button } from '@/components/ui/Button'
import { whatsappHref } from '@/lib/config'
import { CheckIcon } from '@/components/ui/icons'

/**
 * Front-end mock of phone-number login. Wire `onSubmit` to your auth/OTP
 * backend in the product app; here it just shows the confirmation state.
 */
export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n()
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState(false)

  useEffect(() => {
    if (!open) { setSent(false); setPhone(''); setErr(false) }
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [open, onClose])

  if (!open) return null
  const digits = phone.replace(/\D/g, '')
  const submit = () => { if (digits.length < 9) { setErr(true); return } setSent(true) }
  const pretty = '+34 ' + digits.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 p-5 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative w-[min(440px,100%)] rounded-xl2 bg-white p-9">
        <button onClick={onClose} aria-label="Cerrar"
          className="absolute right-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-full text-[1.4rem] hover:bg-cheese-soft">×</button>

        {!sent ? (
          <>
            <img src={logoFull} alt="" className="mx-auto mb-4.5 h-24 w-auto" style={{ marginBottom: '18px' }} />
            <h2 className="mb-2 text-center text-[1.7rem]">{t.login.title}</h2>
            <p className="mb-5.5 text-center text-muted" style={{ marginBottom: '22px' }}>{t.login.body}</p>
            <div className={`mb-3.5 flex overflow-hidden rounded-xl border-2 ${err ? 'border-[#C0392B]' : 'border-line focus-within:border-blue'}`}>
              <span className="border-r-2 border-line bg-sage px-3.5 py-3.5 font-semibold">+34</span>
              <input type="tel" inputMode="numeric" placeholder="6·· ··· ···" aria-label="Número de teléfono"
                value={phone} onChange={(e) => { setPhone(e.target.value); setErr(false) }}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                className="min-w-0 flex-1 px-3.5 py-3.5 text-[1.05rem] font-semibold outline-none" />
            </div>
            <Button className="w-full" onClick={submit}>{t.login.send}</Button>
            <p className="mt-4 text-center text-[0.9rem]">
              {t.login.alt}{' '}
              <a href={whatsappHref()} target="_blank" rel="noopener" className="font-semibold text-blue underline">{t.login.altLink}</a>
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4.5 grid h-16 w-16 place-items-center rounded-full bg-cheese-soft" style={{ marginBottom: '18px' }}>
              <CheckIcon className="h-7 w-7" />
            </div>
            <h2 className="mb-2 text-[1.7rem]">{t.login.okTitle}</h2>
            <p className="mb-5.5 text-muted" style={{ marginBottom: '22px' }}
              dangerouslySetInnerHTML={{ __html: t.login.okBody.replace('{phone}', `<strong>${pretty}</strong>`) }} />
            <Button variant="ghost" onClick={onClose}>{t.login.close}</Button>
          </div>
        )}
      </div>
    </div>
  )
}
