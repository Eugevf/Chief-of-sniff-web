import { useState } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { LoginModal } from '@/components/sections/LoginModal'
import { WaitlistModal } from '@/components/sections/WaitlistModal'
import { CookieBanner } from '@/components/sections/CookieBanner'
import { HomePage } from '@/components/sections/Home'
import { PricingPage } from '@/pages/PricingPage'
import { FaqPage } from '@/pages/FaqPage'
import { LegalPage } from '@/pages/LegalPage'
import { useHashRoute } from '@/lib/useHashRoute'

export function App() {
  const route = useHashRoute()
  const [loginOpen, setLoginOpen] = useState(false)
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const openLogin = () => setLoginOpen(true)
  const openWaitlist = () => setWaitlistOpen(true)

  return (
    <>
      <Header route={route} onLogin={openLogin} onWaitlist={openWaitlist} />
      <main>
        {route === '/' && <HomePage onWaitlist={openWaitlist} />}
        {route === '/precios' && <PricingPage onWaitlist={openWaitlist} />}
        {route === '/preguntas' && <FaqPage onWaitlist={openWaitlist} />}
        {route === '/terminos' && <LegalPage kind="terms" />}
        {route === '/privacidad' && <LegalPage kind="privacy" />}
        {route === '/cookies' && <LegalPage kind="cookies" />}
      </main>
      <Footer onLogin={openLogin} onWaitlist={openWaitlist} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
      <CookieBanner />
    </>
  )
}
