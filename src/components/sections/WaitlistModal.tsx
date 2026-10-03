import { useEffect, useState } from 'react'
import logoFull from '@/assets/logo-full.png'
import { useI18n } from '@/i18n/LanguageContext'
import { Button } from '@/components/ui/Button'
import { CheckIcon } from '@/components/ui/icons'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/config'
import { navigate } from '@/lib/useHashRoute'
import { cn } from '@/lib/cn'

type Status = 'idle' | 'sending' | 'ok' | 'dup' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Waitlist signup. Inserts straight into Supabase (anon key, insert-only RLS). */
export function WaitlistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang } = useI18n()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [privacy, setPrivacy] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (!open) {
      setFirstName(''); setLastName(''); setEmail(''); setPhone('')
      setPrivacy(false); setStatus('idle'); setTouched(false)
    }
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [open, onClose])

  if (!open) return null

  const errors = {
    firstName: firstName.trim() === '',
    lastName: lastName.trim() === '',
    email: !EMAIL_RE.test(email.trim()),
    phone: phone.replace(/\D/g, '').length < 9,
    privacy: !privacy,
  }
  const hasErrors = Object.values(errors).some(Boolean)

  const submit = async () => {
    setTouched(true)
    if (hasErrors || status === 'sending') return
    setStatus('sending')
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist_entries`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          locale: lang,
          privacy_accepted_at: new Date().toISOString(),
        }),
      })
      if (res.status === 201) setStatus('ok')
      else if (res.status === 409) setStatus('dup')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const fieldClass = (bad: boolean) =>
    cn('w-full rounded-xl border-2 px-3.5 py-3 text-[1rem] font-medium outline-none',
      touched && bad ? 'border-[#C0392B]' : 'border-line focus:border-blue')

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 p-5 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="relative max-h-[92vh] w-[min(480px,100%)] overflow-y-auto rounded-xl2 bg-white p-9 max-md:p-6">
        <button onClick={onClose} aria-label={t.waitlist.close}
          className="absolute right-3.5 top-3.5 grid h-9 w-9 place-items-center rounded-full text-[1.4rem] hover:bg-cheese-soft">×</button>

        {status === 'ok' || status === 'dup' ? (
          <div className="text-center">
            <div className="mx-auto mb-4.5 grid h-16 w-16 place-items-center rounded-full bg-cheese-soft" style={{ marginBottom: '18px' }}>
              <CheckIcon className="h-7 w-7" />
            </div>
            <h2 className="mb-2 text-[1.7rem]">{t.waitlist.okTitle}</h2>
            <p className="mb-5.5 text-muted" style={{ marginBottom: '22px' }}>
              {status === 'dup' ? t.waitlist.dupBody : t.waitlist.okBody}
            </p>
            <Button variant="ghost" onClick={onClose}>{t.waitlist.close}</Button>
          </div>
        ) : (
          <>
            <img src={logoFull} alt="" className="mx-auto h-20 w-auto" style={{ marginBottom: '14px' }} />
            <h2 className="mb-2 text-center text-[1.6rem]">{t.waitlist.title}</h2>
            <p className="mb-5 rounded-card bg-cheese-soft px-4 py-3 text-center text-[0.95rem] font-semibold">
              {t.waitlist.announceTitle} {t.waitlist.announceBody}
            </p>

            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
                <input aria-label={t.waitlist.firstName} placeholder={t.waitlist.firstName} autoComplete="given-name"
                  value={firstName} onChange={(e) => setFirstName(e.target.value)} className={fieldClass(errors.firstName)} />
                <input aria-label={t.waitlist.lastName} placeholder={t.waitlist.lastName} autoComplete="family-name"
                  value={lastName} onChange={(e) => setLastName(e.target.value)} className={fieldClass(errors.lastName)} />
              </div>
              <input type="email" aria-label={t.waitlist.email} placeholder={t.waitlist.email} autoComplete="email"
                value={email} onChange={(e) => setEmail(e.target.value)} className={fieldClass(errors.email)} />
              <input type="tel" aria-label={t.waitlist.phone} placeholder={t.waitlist.phone} autoComplete="tel"
                value={phone} onChange={(e) => setPhone(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()} className={fieldClass(errors.phone)} />

              <label className={cn('flex cursor-pointer items-start gap-2.5 py-1 text-[0.92rem]',
                touched && errors.privacy ? 'text-[#C0392B]' : 'text-muted')}>
                <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)}
                  className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-blue" />
                <span>
                  {t.waitlist.privacy}{' '}
                  <button type="button" onClick={() => { onClose(); navigate('/privacidad') }}
                    className="font-semibold text-blue underline underline-offset-2">{t.waitlist.privacyLink}</button>
                </span>
              </label>

              {touched && hasErrors && <p className="text-[0.88rem] font-semibold text-[#C0392B]">{t.waitlist.invalid}</p>}
              {status === 'error' && <p className="text-[0.88rem] font-semibold text-[#C0392B]">{t.waitlist.errBody}</p>}

              <Button className="w-full" onClick={submit} disabled={status === 'sending'}>
                {status === 'sending' ? t.waitlist.sending : t.waitlist.submit}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
