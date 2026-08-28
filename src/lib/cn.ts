/** Tiny classname joiner. Keeps deps at zero; swap for clsx/tailwind-merge if the app needs it. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
