import { useEffect, useState, type ReactNode } from 'react'
import logoFull from '@/assets/logo-full.png'
import logoIso from '@/assets/logo-iso.png'
import logoAvatar from '@/assets/logo-avatar.png'
import { Button } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Stars } from '@/components/ui/Stars'
import {
  VaccineIcon, BellIcon, VetIcon, ScissorsIcon, HomeIcon, BoneIcon, PawIcon, DocIcon,
  PuppyIcon, SunIcon, PillIcon, BagIcon, WhatsAppIcon, CheckCircleIcon, CheckIcon,
  StarIcon, NoseIcon, InstagramIcon, TikTokIcon,
} from '@/components/ui/icons'
import { cn } from '@/lib/cn'

/**
 * Internal design-system page (/#/design, also reachable as /design).
 * Color and scale values are read LIVE from tokens.css via getComputedStyle,
 * so editing that file updates this page. Clicking a swatch copies its var().
 */

type TokenMeta = { token: string; usage: string; darkText?: boolean }

const BRAND: TokenMeta[] = [
  { token: '--navy', usage: 'Texto principal, secciones oscuras, cabecera del chat' },
  { token: '--navy-2', usage: 'Tarjetas dentro de secciones oscuras' },
  { token: '--blue', usage: 'Botones primarios, enlaces, acentos, estados activos' },
  { token: '--blue-dark', usage: 'Hover del botón primario' },
  { token: '--sky', usage: 'Regla del eyebrow, acentos suaves, contornos de checks' },
  { token: '--cheese', usage: 'Subrayado marcador, estrellas, anillo de foco', darkText: true },
  { token: '--cheese-soft', usage: 'Badges suaves («próximamente»), fondos de avatar', darkText: true },
]
const SURFACES: TokenMeta[] = [
  { token: '--sage', usage: 'Fondo de página', darkText: true },
  { token: '--sage-2', usage: 'Fondo del footer', darkText: true },
  { token: '--white', usage: 'Tarjetas y paneles', darkText: true },
  { token: '--line', usage: 'Bordes y divisores', darkText: true },
  { token: '--muted', usage: 'Texto secundario' },
]
const CHAT: TokenMeta[] = [
  { token: '--wa', usage: 'Verde WhatsApp (reservado; los CTA van en azul)' },
  { token: '--wa-dark', usage: 'Verde WhatsApp oscuro' },
  { token: '--chat-bg', usage: 'Fondo del mock de chat', darkText: true },
  { token: '--bubble-in', usage: 'Burbuja entrante', darkText: true },
  { token: '--bubble-out', usage: 'Burbuja saliente', darkText: true },
]

const RADII = [
  { token: '--radius-pill', usage: 'Botones y badges' },
  { token: '--radius-card', usage: 'Tarjetas' },
  { token: '--radius-xl2', usage: 'Paneles grandes' },
]

const TYPE_SCALE = [
  { name: 'Hero', spec: 'clamp(2.7rem, 5.4vw, 4.6rem) · display 800', cls: 'font-display font-extrabold text-[clamp(2.7rem,5.4vw,4.6rem)] leading-[1.05] tracking-tight' },
  { name: 'Título de sección', spec: 'clamp(2.4rem, 4.5vw, 3.6rem) · display 700', cls: 'font-display font-bold text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1.05] tracking-tight' },
  { name: 'Título de tarjeta', spec: '1.6rem · display 700', cls: 'font-display font-bold text-[1.6rem]' },
  { name: 'Lead', spec: '1.2rem · body 400 · muted', cls: 'text-[1.2rem] text-muted' },
  { name: 'Cuerpo', spec: '0.97–1rem · body 400', cls: 'text-[0.97rem]' },
  { name: 'UI pequeña', spec: '0.9rem · body 500', cls: 'text-[0.9rem] font-medium' },
]

const SECTIONS = [
  ['color-marca', 'Color · Marca'],
  ['color-superficies', 'Color · Superficies'],
  ['color-chat', 'Color · WhatsApp y chat'],
  ['tipografia', 'Tipografía'],
  ['marcador', 'El marcador cheese'],
  ['espaciado', 'Espaciado y layout'],
  ['radios', 'Radios'],
  ['sombras', 'Sombras'],
  ['botones', 'Botones'],
  ['componentes', 'Componentes'],
  ['iconos', 'Iconos'],
  ['movimiento', 'Movimiento'],
  ['logos', 'Logos'],
] as const

function useTokenValues(): Record<string, string> {
  const [values, setValues] = useState<Record<string, string>>({})
  useEffect(() => {
    const style = getComputedStyle(document.documentElement)
    const all = [...BRAND, ...SURFACES, ...CHAT, ...RADII].map((t) => t.token)
      .concat(['--font-display', '--font-body', '--max'])
    const next: Record<string, string> = {}
    for (const token of all) next[token] = style.getPropertyValue(token).trim()
    setValues(next)
  }, [])
  return values
}

function CopyChip({ token }: { token: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`var(${token})`)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch { /* clipboard unavailable: ignore */ }
  }
  return (
    <button onClick={copy} className="font-mono text-[0.82rem] font-semibold text-blue hover:underline" title="Copiar var()">
      {copied ? '¡copiado!' : token}
    </button>
  )
}

function Swatch({ meta, value }: { meta: TokenMeta; value: string }) {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-white">
      <div className="flex h-24 items-end p-3" style={{ background: `var(${meta.token})` }}>
        <span className={cn('font-mono text-[0.78rem] font-bold', meta.darkText ? 'text-navy/70' : 'text-white/80')}>
          {value}
        </span>
      </div>
      <div className="p-3.5">
        <CopyChip token={meta.token} />
        <p className="mt-1 text-[0.88rem] text-muted">{meta.usage}</p>
      </div>
    </div>
  )
}

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line pt-10">
      <h2 className="mb-1.5 text-[1.7rem]">{title}</h2>
      {intro && <p className="mb-6 max-w-[64ch] text-[0.95rem] text-muted">{intro}</p>}
      {!intro && <div className="mb-6" />}
      {children}
    </section>
  )
}

function SwatchGrid({ tokens, values }: { tokens: TokenMeta[]; values: Record<string, string> }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tokens.map((t) => <Swatch key={t.token} meta={t} value={values[t.token] ?? '…'} />)}
    </div>
  )
}

export function DesignPage() {
  const values = useTokenValues()
  const [bubbleKey, setBubbleKey] = useState(0)

  return (
    <div className="mx-auto grid max-w-content gap-10 px-6 py-16 lg:grid-cols-[200px_1fr]">
      {/* Sidebar */}
      <nav aria-label="Secciones" className="top-24 hidden self-start lg:sticky lg:block">
        <p className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-muted">Fundamentos</p>
        <ul className="grid gap-2 text-[0.9rem]">
          {SECTIONS.map(([id, label]) => (
            <li key={id}>
              <a href={`#/design#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }}
                className="text-muted hover:text-navy hover:underline">{label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content */}
      <div className="grid gap-12">
        <header>
          <Eyebrow>Design system</Eyebrow>
          <h1 className="my-4 text-[clamp(2.4rem,4.5vw,3.6rem)]">El lenguaje visual de <span className="mark-cheese">Chief of Sniff</span></h1>
          <p className="max-w-[62ch] text-[1.05rem] text-muted">
            Colores, tipografía, espaciado y movimiento como tokens con nombre. Esta página lee los valores en vivo
            de <code className="rounded bg-sage-2 px-1.5 py-0.5 font-mono text-[0.9em] text-navy">src/styles/tokens.css</code>:
            cambia un valor allí y recarga. Haz clic en cualquier token para copiar su <code className="font-mono text-[0.9em]">var()</code>.
            La regla de la casa: nunca un hex a mano en un componente — siempre el nombre semántico.
          </p>
        </header>

        <Section id="color-marca" title="Color · Marca">
          <SwatchGrid tokens={BRAND} values={values} />
        </Section>

        <Section id="color-superficies" title="Color · Superficies">
          <SwatchGrid tokens={SURFACES} values={values} />
        </Section>

        <Section id="color-chat" title="Color · WhatsApp y chat">
          <SwatchGrid tokens={CHAT} values={values} />
        </Section>

        <Section id="tipografia" title="Tipografía"
          intro="Bricolage Grotesque (700–800) solo para títulos, con tracking -0.02em. Instrument Sans (400–700) para todo lo demás. Los títulos usan clamp(): fluyen con el ancho de pantalla.">
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-card border border-line bg-white p-5">
              <CopyChip token="--font-display" />
              <p className="mb-2 mt-1 text-[0.88rem] text-muted">{values['--font-display'] || '…'}</p>
              <p className="font-display text-[2.6rem] font-extrabold leading-none tracking-tight">Aa Gg 0123</p>
            </div>
            <div className="rounded-card border border-line bg-white p-5">
              <CopyChip token="--font-body" />
              <p className="mb-2 mt-1 text-[0.88rem] text-muted">{values['--font-body'] || '…'}</p>
              <p className="text-[2.6rem] leading-none">Aa Gg 0123</p>
            </div>
          </div>
          <div className="grid gap-0 overflow-hidden rounded-card border border-line bg-white">
            {TYPE_SCALE.map((t, i) => (
              <div key={t.name} className={cn('grid gap-1 p-5 sm:grid-cols-[180px_1fr] sm:items-baseline', i > 0 && 'border-t border-line')}>
                <div>
                  <p className="text-[0.88rem] font-semibold">{t.name}</p>
                  <p className="font-mono text-[0.75rem] text-muted">{t.spec}</p>
                </div>
                <p className={cn(t.cls, 'truncate')}>El asistente de tu mascota</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="marcador" title="El marcador cheese"
          intro="El gesto tipográfico de la marca: la segunda mitad de un título lleva el subrayado marcador (.mark-cheese). Sin cursivas — se descartaron a propósito.">
          <div className="rounded-card border border-line bg-white p-7">
            <p className="font-display text-[2.2rem] font-extrabold tracking-tight">
              El asistente personal <span className="mark-cheese">de tu mascota</span>
            </p>
          </div>
        </Section>

        <Section id="espaciado" title="Espaciado y layout">
          <ul className="grid gap-2.5 rounded-card border border-line bg-white p-6 text-[0.95rem]">
            <li><b className="font-mono text-[0.88em]">--max</b> · contenedor de <b>{values['--max'] || '1180px'}</b> con 24px de margen lateral</li>
            <li>Secciones: <b>96px</b> en vertical (64px en móvil)</li>
            <li>Separaciones internas habituales: 12 / 20 / 24 / 32px</li>
          </ul>
        </Section>

        <Section id="radios" title="Radios">
          <div className="grid gap-4 sm:grid-cols-3">
            {RADII.map((r) => (
              <div key={r.token} className="rounded-card border border-line bg-white p-5 text-center">
                <div className="mx-auto mb-4 h-20 w-full border-2 border-blue bg-sage" style={{ borderRadius: `var(${r.token})` }} />
                <CopyChip token={r.token} />
                <p className="text-[0.85rem] text-muted">{values[r.token] || '…'} · {r.usage}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section id="sombras" title="Sombras"
          intro="Definidas en tailwind.config.ts (shadow-card y shadow-phone).">
          <div className="grid gap-6 rounded-card bg-sage-2 p-8 sm:grid-cols-2">
            <div className="rounded-card bg-white p-6 shadow-card">
              <p className="font-semibold">shadow-card</p>
              <p className="font-mono text-[0.75rem] text-muted">0 14px 30px -18px rgba(13,27,42,.3)</p>
              <p className="mt-2 text-[0.9rem] text-muted">Elevación al hacer hover sobre tarjetas.</p>
            </div>
            <div className="rounded-card bg-white p-6 shadow-phone">
              <p className="font-semibold">shadow-phone</p>
              <p className="font-mono text-[0.75rem] text-muted">0 30px 60px -20px rgba(13,27,42,.45) + anillo</p>
              <p className="mt-2 text-[0.9rem] text-muted">El teléfono del hero.</p>
            </div>
          </div>
        </Section>

        <Section id="botones" title="Botones"
          intro="Variantes primary / ghost / white, tamaños md / sm. El CTA de la lista de espera lleva la nariz, que olfatea al pasar el ratón.">
          <div className="grid gap-5 rounded-card border border-line bg-white p-7">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary md</Button>
              <Button size="sm">Primary sm</Button>
              <Button variant="ghost">Ghost md</Button>
              <Button variant="ghost" size="sm">Ghost sm</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-card bg-navy p-5">
              <Button variant="white">White (sobre navy)</Button>
              <Button variant="white" size="sm">White sm</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button className="group"><NoseIcon className="h-[18px] w-[18px] group-hover:animate-sniff" />Pasa el ratón: olfatea</Button>
            </div>
          </div>
        </Section>

        <Section id="componentes" title="Componentes">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-4 rounded-card border border-line bg-white p-6">
              <p className="text-[0.82rem] font-bold uppercase tracking-[0.12em] text-muted">Eyebrow</p>
              <Eyebrow>Sección normal</Eyebrow>
              <div className="rounded-xl bg-navy p-4"><Eyebrow onDark>Sobre fondo oscuro</Eyebrow></div>
            </div>
            <div className="grid gap-4 rounded-card border border-line bg-white p-6">
              <p className="text-[0.82rem] font-bold uppercase tracking-[0.12em] text-muted">Stars y badge</p>
              <Stars />
              <span className="w-fit rounded-pill bg-cheese-soft px-3 py-1 text-[0.78rem] font-bold text-navy">Próximamente</span>
            </div>
            <div className="rounded-card border border-line p-6 sm:col-span-2" style={{ background: 'var(--chat-bg)' }}>
              <p className="mb-4 text-[0.82rem] font-bold uppercase tracking-[0.12em] text-navy/60">Burbujas de chat</p>
              <div className="grid max-w-[420px] gap-2.5">
                <div className="w-fit rounded-xl rounded-tl-sm bg-white px-3.5 py-2.5 text-[0.92rem] shadow-sm">A Batam le vence la polivalente. ¿Pido cita?</div>
                <div className="ml-auto w-fit rounded-xl rounded-tr-sm px-3.5 py-2.5 text-[0.92rem] shadow-sm" style={{ background: 'var(--bubble-out)' }}>Sí, la semana que viene</div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="iconos" title="Iconos"
          intro="Set propio de línea: trazo navy con detalle azul. Con tone=&quot;onDark&quot; pasan a blanco con detalle cheese para superficies oscuras.">
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {([
              ['Vaccine', <VaccineIcon key="v" className="h-10 w-10" />],
              ['Bell', <BellIcon key="b" className="h-10 w-10" />],
              ['Vet', <VetIcon key="vt" className="h-10 w-10" />],
              ['Scissors', <ScissorsIcon key="s" className="h-10 w-10" />],
              ['Home', <HomeIcon key="h" className="h-10 w-10" />],
              ['Bone', <BoneIcon key="bo" className="h-10 w-10" />],
              ['Paw', <PawIcon key="p" className="h-10 w-10" />],
              ['Doc', <DocIcon key="d" className="h-10 w-10" />],
              ['Puppy', <PuppyIcon key="pu" className="h-10 w-10" />],
              ['Sun', <SunIcon key="su" className="h-10 w-10" />],
              ['Pill', <PillIcon key="pi" className="h-10 w-10" />],
              ['Bag', <BagIcon key="ba" className="h-10 w-10" />],
              ['CheckCircle', <CheckCircleIcon key="cc" className="h-10 w-10" />],
              ['Check', <CheckIcon key="c" className="h-8 w-8" />],
              ['Star', <StarIcon key="st" className="h-8 w-8" />],
              ['Nose', <NoseIcon key="n" className="h-8 w-8 text-navy" />],
              ['WhatsApp', <WhatsAppIcon key="w" className="h-8 w-8 text-navy" />],
              ['Instagram', <InstagramIcon key="i" className="h-8 w-8 text-navy" />],
              ['TikTok', <TikTokIcon key="t" className="h-8 w-8 text-navy" />],
            ] as [string, ReactNode][]).map(([name, icon]) => (
              <div key={name} className="grid place-items-center gap-2 rounded-card border border-line bg-white p-4">
                {icon}
                <span className="font-mono text-[0.72rem] text-muted">{name}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-5 rounded-card bg-navy p-5">
            <VaccineIcon tone="onDark" className="h-10 w-10" />
            <BellIcon tone="onDark" className="h-10 w-10" />
            <ScissorsIcon tone="onDark" className="h-10 w-10" />
            <PawIcon tone="onDark" className="h-10 w-10" />
            <CheckCircleIcon tone="onDark" className="h-10 w-10" />
            <span className="font-mono text-[0.78rem] text-white/70">tone="onDark"</span>
          </div>
        </Section>

        <Section id="movimiento" title="Movimiento"
          intro="Tres animaciones, y todas respetan prefers-reduced-motion.">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="grid place-items-center gap-3 rounded-card border border-line bg-white p-6">
              <span className="group grid h-16 w-16 place-items-center rounded-full bg-blue text-white">
                <NoseIcon className="h-9 w-9 group-hover:animate-sniff" />
              </span>
              <p className="font-mono text-[0.78rem] text-muted">animate-sniff · hover</p>
            </div>
            <div className="grid place-items-center gap-3 rounded-card border border-line bg-white p-6">
              <div key={bubbleKey} className="animate-bubble-in rounded-xl bg-sage-2 px-4 py-2.5 text-[0.9rem]">¡Guau!</div>
              <button onClick={() => setBubbleKey((k) => k + 1)} className="font-mono text-[0.78rem] text-blue hover:underline">animate-bubble-in · repetir</button>
            </div>
            <div className="grid place-items-center gap-3 rounded-card border border-line bg-white p-6">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 animate-blink rounded-full bg-muted" />
                <span className="h-2.5 w-2.5 animate-blink rounded-full bg-muted [animation-delay:.2s]" />
                <span className="h-2.5 w-2.5 animate-blink rounded-full bg-muted [animation-delay:.4s]" />
              </div>
              <p className="font-mono text-[0.78rem] text-muted">animate-blink · escribiendo</p>
            </div>
          </div>
        </Section>

        <Section id="logos" title="Logos"
          intro="Tres variantes en PNG transparente (src/assets/). El isotipo mantiene su proporción: nunca forzarlo a un cuadrado.">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="grid place-items-center gap-2 rounded-card border border-line bg-white p-6">
              <img src={logoFull} alt="Logo completo" className="h-32 w-auto" />
              <span className="font-mono text-[0.75rem] text-muted">logo-full</span>
            </div>
            <div className="grid place-items-center gap-2 rounded-card border border-line bg-white p-6">
              <img src={logoIso} alt="Isotipo" className="h-20 w-auto" />
              <span className="font-mono text-[0.75rem] text-muted">logo-iso</span>
            </div>
            <div className="grid place-items-center gap-2 rounded-card border border-line bg-white p-6">
              <img src={logoAvatar} alt="Avatar" className="h-20 w-20 rounded-full" />
              <span className="font-mono text-[0.75rem] text-muted">logo-avatar</span>
            </div>
          </div>
        </Section>
      </div>
    </div>
  )
}
