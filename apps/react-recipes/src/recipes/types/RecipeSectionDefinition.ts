import type { RecipeSectionKind } from './RecipeSectionKind'

export interface RecipeSectionDefinition {
  id: string
  title: string
  kind: RecipeSectionKind
  content: string
}
