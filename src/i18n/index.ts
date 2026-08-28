import { es } from './es'
import { en } from './en'
import { ca } from './ca'
import type { Content, Lang } from './types'

export const dictionaries: Record<Lang, Content> = { es, en, ca }
export const LANGS: Lang[] = ['es', 'en', 'ca']
export type { Content, Lang } from './types'
