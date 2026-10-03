import { es } from './es'
import { en } from './en'
import { ca } from './ca'
import { fr } from './fr'
import { it } from './it'
import { de } from './de'
import { pt } from './pt'
import type { Content, Lang } from './types'

export const dictionaries: Record<Lang, Content> = { es, en, ca, fr, it, de, pt }
export const LANGS: Lang[] = ['es', 'en', 'ca', 'fr', 'it', 'de', 'pt']
export type { Content, Lang } from './types'
