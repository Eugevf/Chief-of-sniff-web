import { useEffect, useState } from 'react'

export type Route = '/' | '/precios' | '/preguntas' | '/terminos' | '/privacidad' | '/cookies'
const ROUTES: Route[] = ['/', '/precios', '/preguntas', '/terminos', '/privacidad', '/cookies']

function current(): Route {
  const h = window.location.hash.replace(/^#/, '') as Route
  return ROUTES.includes(h) ? h : '/'
}

/** Minimal hash router for the SPA. Vercel rewrite keeps deep links working. */
export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(current)
  useEffect(() => {
    const onHash = () => { setRoute(current()); window.scrollTo({ top: 0 }) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

export function navigate(route: Route) { window.location.hash = route }
