import { StarIcon } from './icons'

export function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-[3px]" role="img" aria-label={`${count} de 5 estrellas`}>
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} className="h-[18px] w-[18px]" />
      ))}
    </div>
  )
}
