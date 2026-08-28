/**
 * Chief of Sniff icon set. Line style, navy stroke + blue detail by default.
 * Pass `tone="onDark"` on a dark surface to switch to white stroke + cheese detail.
 * All icons share the 64×64 viewBox and inherit sizing from the wrapping element.
 */
import type { SVGProps } from 'react'

type Tone = 'default' | 'onDark'
type IconProps = SVGProps<SVGSVGElement> & { tone?: Tone }

const colors = (tone: Tone) =>
  tone === 'onDark'
    ? { stroke: '#FFFFFF', accent: '#F2C14E', fillBg: '#122A45' }
    : { stroke: '#0D1B2A', accent: '#0077E6', fillBg: '#FFFFFF' }

const wrap = (tone: Tone, children: (c: ReturnType<typeof colors>) => JSX.Element, p: IconProps) => {
  const { tone: _t, ...rest } = p
  const c = colors(tone)
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke={c.stroke} strokeWidth={2.6}
      strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {children(c)}
    </svg>
  )
}

export const VaccineIcon = (p: IconProps) => wrap(p.tone ?? 'default', (c) => (<>
  <rect x="14" y="20" width="36" height="30" rx="5" /><path d="M14 32h36" />
  <path d="M24 14v8M40 14v8" /><path d="M26 38h12M32 38v-6" stroke={c.accent} strokeWidth={3.2} />
  <circle cx="46" cy="46" r="8" fill="#fff" stroke={c.accent} /><path d="M42 46l3 3 5-6" stroke={c.accent} />
</>), p)

export const BellIcon = (p: IconProps) => wrap(p.tone ?? 'default', (c) => (<>
  <path d="M32 14c8 0 13 6 13 14v6c0 4 2 6 5 8H14c3-2 5-4 5-8v-6c0-8 5-14 13-14z" />
  <path d="M27 46c0 3 2 5 5 5s5-2 5-5" /><path d="M50 18l4-4M14 18l-4-4M32 10V6" stroke={c.accent} strokeWidth={3} />
</>), p)

export const VetIcon = (p: IconProps) => wrap(p.tone ?? 'default', (c) => (<>
  <rect x="10" y="20" width="44" height="30" rx="6" />
  <path d="M24 20v-4a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4" />
  <path d="M32 28v12M26 34h12" stroke={c.accent} strokeWidth={4} />
</>), p)

export const ScissorsIcon = (p: IconProps) => wrap(p.tone ?? 'default', (c) => (<>
  <circle cx="20" cy="44" r="7" /><circle cx="20" cy="20" r="7" />
  <path d="M26 24l24 16M26 40l24-16" /><path d="M40 32l10 6.7M40 32l10-6.7" stroke={c.accent} strokeWidth={3} />
</>), p)

export const HomeIcon = (p: IconProps) => wrap(p.tone ?? 'default', (c) => (<>
  <path d="M12 30L32 14l20 16" /><path d="M18 26v22h28V26" /><path d="M28 48V38h8v10" />
  <circle cx="32" cy="30" r="3" fill={c.accent} stroke="none" />
  <circle cx="27" cy="27" r="1.6" fill={c.accent} stroke="none" />
  <circle cx="37" cy="27" r="1.6" fill={c.accent} stroke="none" />
</>), p)

export const BoneIcon = (p: IconProps) => wrap(p.tone ?? 'default', (c) => (<>
  <rect x="18" y="28" width="28" height="8" rx="4" />
  <circle cx="18" cy="26" r="5.5" fill="#fff" /><circle cx="18" cy="38" r="5.5" fill="#fff" />
  <circle cx="46" cy="26" r="5.5" fill="#fff" /><circle cx="46" cy="38" r="5.5" fill="#fff" />
  <path d="M27 32h10" stroke={c.accent} strokeWidth={3.2} />
</>), p)

export const PawIcon = (p: IconProps) => wrap(p.tone ?? 'default', (c) => (<>
  <path d="M32 54s-16-13-16-26a16 16 0 0 1 32 0c0 13-16 26-16 26z" />
  <g fill={c.accent} stroke="none">
    <ellipse cx="32" cy="31" rx="4.5" ry="4" /><circle cx="25.5" cy="24" r="2.2" />
    <circle cx="30" cy="20.5" r="2.2" /><circle cx="34" cy="20.5" r="2.2" /><circle cx="38.5" cy="24" r="2.2" />
  </g>
</>), p)

export const DocIcon = (p: IconProps) => wrap(p.tone ?? 'default', (c) => (<>
  <path d="M18 10h20l10 10v34H18z" /><path d="M38 10v10h10" />
  <path d="M32 44s-8-5-8-11a4 4 0 0 1 8-2 4 4 0 0 1 8 2c0 6-8 11-8 11z" fill={c.accent} stroke="none" />
</>), p)

export const PuppyIcon = (p: IconProps) => wrap(p.tone ?? 'default', (c) => (<>
  <g fill={c.accent} stroke="none">
    <ellipse cx="32" cy="38" rx="9" ry="8" /><circle cx="19" cy="26" r="4.5" />
    <circle cx="27" cy="19" r="4.5" /><circle cx="37" cy="19" r="4.5" /><circle cx="45" cy="26" r="4.5" />
  </g><circle cx="32" cy="32" r="26" />
</>), p)

export const SunIcon = (p: IconProps) => wrap(p.tone ?? 'default', (c) => (<>
  <circle cx="32" cy="32" r="10" fill={c.accent} stroke="none" />
  <path d="M32 8v8M32 48v8M8 32h8M48 32h8M15 15l6 6M43 43l6 6M15 49l6-6M43 21l6-6" />
</>), p)

export const PillIcon = (p: IconProps) => wrap(p.tone ?? 'default', (c) => (<>
  <rect x="8" y="24" width="48" height="16" rx="8" transform="rotate(-35 32 32)" />
  <path d="M26 22l12 20" transform="rotate(-35 32 32)" />
  <rect x="8" y="24" width="24" height="16" rx="8" fill={c.accent} stroke="none" transform="rotate(-35 32 32)" />
</>), p)

export const BagIcon = (p: IconProps) => wrap(p.tone ?? 'default', (c) => (<>
  <path d="M14 22h36l-3 30H17z" /><path d="M24 22v-4a8 8 0 0 1 16 0v4" />
  <path d="M24 34a8 8 0 0 0 16 0" stroke={c.accent} strokeWidth={3.2} />
</>), p)

/** WhatsApp glyph (uses currentColor; sits inside buttons). */
export const WhatsAppIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.7-1.2-1.5-1.4-1.7-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 1.5.6 2.1.7 2.9.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3z" />
  </svg>
)

/** Circle-check used in the feature strip and household list. */
export const CheckCircleIcon = ({ tone = 'default', ...p }: IconProps) => {
  const stroke = tone === 'onDark' ? '#F2C14E' : '#0D1B2A'
  const accent = tone === 'onDark' ? '#F2C14E' : '#0077E6'
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" strokeOpacity={tone === 'onDark' ? 0.4 : 1} />
      <path d="M8 12l3 3 5-6" stroke={accent} strokeWidth={2.2} />
    </svg>
  )
}

/** Small check used in pricing lists (no circle). */
export const CheckIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#0077E6" strokeWidth={2.4}
    strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12l5 5L20 7" />
  </svg>
)

export const StarIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="#F2C14E" aria-hidden {...p}>
    <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
  </svg>
)
