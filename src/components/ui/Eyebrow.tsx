import { cn } from '@/lib/cn'

/** Small uppercase label with a leading rule. `onDark` recolours for dark sections. */
export function Eyebrow({ children, onDark = false, center = false }:
  { children: React.ReactNode; onDark?: boolean; center?: boolean }) {
  return (
    <p className={cn(
      'flex items-center gap-3 text-[0.78rem] font-bold uppercase tracking-[0.16em]',
      center && 'justify-center',
      onDark ? 'text-cheese' : 'text-blue',
    )}>
      {!center && <span className={cn('h-0.5 w-7', onDark ? 'bg-cheese' : 'bg-blue-sky')} />}
      {children}
    </p>
  )
}
