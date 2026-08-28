import { useState } from 'react'
import { Header } from '@/components/sections/Header'
import { Footer } from '@/components/sections/Footer'
import { LoginModal } from '@/components/sections/LoginModal'
import { HomePage } from '@/components/sections/Home'
import { PricingPage } from '@/pages/PricingPage'
import { FaqPage } from '@/pages/FaqPage'
import { LegalPage } from '@/pages/LegalPage'
import { useHashRoute } from '@/lib/useHashRoute'

export function App() {
  const route = useHashRoute()
  const [loginOpen, setLoginOpen] = useState(false)
  const openLogin = () => setLoginOpen(true)

  return (
    <>
      <Header route={route} onLogin={openLogin} />
      <main>
        {route === '/' && <HomePage onLogin={openLogin} />}
        {route === '/precios' && <PricingPage />}
        {route === '/preguntas' && <FaqPage />}
        {route === '/terminos' && <LegalPage kind="terms" />}
        {route === '/privacidad' && <LegalPage kind="privacy" />}
      </main>
      <Footer onLogin={openLogin} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
