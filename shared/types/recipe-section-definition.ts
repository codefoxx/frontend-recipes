import type { RecipeSectionKind } from './recipe-section-kind'

/**
 * Framework-agnostic description of a single recipe section.
 */
export interface RecipeSectionDefinition {
  id: string
  title: string
  kind: RecipeSectionKind
  content: string
}
