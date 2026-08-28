# Chief of Sniff — Design System

The single source of visual truth for both the marketing site and the product app.
Tokens live in two mirrored places, kept in sync by hand:

- `src/styles/tokens.css` — CSS custom properties (use in raw CSS / the product app if it isn't on Tailwind).
- `tailwind.config.ts` — the same values as Tailwind theme extensions (use via utility classes).

**Rule:** never hardcode a hex value in a component. Use the semantic name.

## Colour

| Token | Hex | Use |
|---|---|---|
| `navy` | `#0D1B2A` | Primary text, dark sections, chat header |
| `navy-2` | `#122A45` | Cards inside dark sections |
| `blue` | `#0077E6` | Primary buttons, links, icon accent, active states |
| `blue-dark` | `#0062BD` | Primary button hover |
| `blue-sky` (`sky`) | `#4DA8FF` | Eyebrow rule, soft accents, check outlines |
| `cheese` | `#F2C14E` | Highlighter marks, stars, focus ring, dark-section accents |
| `cheese-soft` | `#FBEBB9` | Soft badges (“coming soon”), avatar backgrounds |
| `sage` | `#F5F7F2` | Page background |
| `sage-2` | `#EBEFE7` | Footer background |
| `line` | `#D7DFD5` | Borders, dividers |
| `muted` | `#5C6B62` | Secondary text |
| `wa` / `wa-dark` | `#25D366` / `#1DA851` | WhatsApp green (reserved; brand uses blue for CTAs) |
| `chat-bg/in/out` | `#E4DDD3` / `#FFF` / `#D6EAFF` | Chat mockup surfaces |

## Typography

- **Display:** Bricolage Grotesque (700–800). Headings only, tight tracking (`-0.02em`).
- **Body:** Instrument Sans (400–700). Everything else.
- Loaded from Google Fonts in `globals.css`. Type scale is expressed with `clamp()` on headings so it's fluid.
- **Signature type move:** the second half of a hero/section title gets the cheese highlighter (`.mark-cheese`). No italics — that was deliberately dropped.

## Spacing, radius, shadow

- Container: `max-w-content` (1180px), 24px side padding.
- Sections: 96px vertical (64px on mobile).
- Radii: `pill` (999px) for buttons/badges, `card` (20px), `xl2` (24px) for large panels.
- Shadows: `shadow-card` (hover lift), `shadow-phone` (the device mock).

## Motion

- `animate-bubble-in` — chat messages entering.
- `animate-blink` — typing dots.
- Everything respects `prefers-reduced-motion` (see `globals.css` and `PhoneChat.tsx`).

## Components (`src/components/ui`)

- `Button` / `ButtonLink` — variants `primary | ghost | white`, sizes `md | sm`.
- `Eyebrow` — labelled section kicker with leading rule; `onDark` + `center` flags.
- `Stars` — 5-star row for reviews.
- `LanguageSwitcher` — ES / EN / CA toggle, persists to `localStorage`.
- `icons.tsx` — the full line-icon set. Every icon takes `tone="default" | "onDark"` to recolour for light vs dark surfaces.

## Reusing this in the product app

1. Copy `tailwind.config.ts`, `postcss.config.js`, `src/styles/`, `src/lib/cn.ts`, and `src/components/ui/`.
2. Keep the token names identical so screens read the same.
3. The `useI18n` context + `src/i18n/` can be reused as-is for a trilingual product.
