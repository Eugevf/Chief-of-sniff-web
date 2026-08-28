# Chief of Sniff — Website

Marketing site + design system for Chief of Sniff, built as a single-page app.
Trilingual (ES / EN / CA), no backend, deploys as static files to Vercel.

## Stack

- **Vite** (build) + **React 18** + **TypeScript**
- **Tailwind CSS** for styling, driven by the design tokens in `tailwind.config.ts`
- Hash-based routing (no router dependency) — see `src/lib/useHashRoute.ts`
- i18n via a typed React context — see `src/i18n/`

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Before you deploy — things to set

1. **WhatsApp number** — `src/lib/config.ts`, set `WA_NUMBER` (digits only, no `+`).
2. **Legal text** — `src/i18n/{es,en,ca}.ts`, the `legal.terms` / `legal.privacy` fields
   are a *template*. Fill every `[BRACKETED]` field and have a lawyer review before publishing.
3. **Reviews** — `reviews.items` in the same files are placeholders. Replace with real,
   consented testimonials, or remove the section (publishing invented testimonials is
   illegal advertising in Spain).
4. **Login** — `src/components/sections/LoginModal.tsx` is a front-end mock. Wire it to your
   OTP/auth backend.

## Deploying to Vercel

This is a static SPA. Two ways:

**Dashboard:** import the repo, Vercel auto-detects Vite. Build command `npm run build`,
output directory `dist`. Done.

**CLI:**
```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

`vercel.json` already rewrites all routes to `index.html` so deep links (`/#/precios`) and
future non-hash routes work.

## Structure

```
src/
  assets/            logo variants (transparent PNGs)
  components/
    ui/              design-system primitives (Button, Eyebrow, icons, Stars…)
    sections/        page sections (Header, Footer, Home, PhoneChat, LoginModal)
  pages/             Pricing, FAQ, Legal
  i18n/              types + es/en/ca content dictionaries + LanguageContext
  lib/               config, hash router, cn helper
  styles/            tokens.css (source of truth) + globals.css
public/              favicon, apple-touch-icon, og-image
```

## Design system

See `DESIGN_SYSTEM.md`. The tokens and `src/components/ui/` are meant to be lifted
straight into the product app so the site and the app share one visual language.

## Editing content

All copy lives in `src/i18n/es.ts` / `en.ts` / `ca.ts`, typed against `src/i18n/types.ts`.
Change text there; the components read from the active dictionary. If you add a field,
add it to `types.ts` and all three files (TypeScript will flag any you miss).
