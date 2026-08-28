import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'white'
type Size = 'md' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-pill font-semibold ' +
  'transition-[transform,background,border-color] duration-150 hover:-translate-y-px whitespace-nowrap'

const variants: Record<Variant, string> = {
  primary: 'bg-blue text-white hover:bg-blue-dark',
  ghost: 'bg-transparent border-[1.5px] border-line text-navy hover:border-navy',
  white: 'bg-white text-blue hover:bg-cheese-soft',
}
const sizes: Record<Size, string> = {
  md: 'px-6 py-3.5 text-base',
  sm: 'px-[18px] py-2.5 text-[0.92rem]',
}

type CommonProps = { variant?: Variant; size?: Size; children: ReactNode; className?: string }

export function Button({
  variant = 'primary', size = 'md', className, children, ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  )
}

/** Same styling, rendered as an anchor (external links, WhatsApp CTA). */
export function ButtonLink({
  variant = 'primary', size = 'md', className, children, ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </a>
  )
}
