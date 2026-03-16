import type { RecipeCategory } from './recipe-category'
import type { RecipeDemoKey } from './recipe-demo-key'
import type { RecipeSectionDefinition } from './recipe-section-definition'
import type { RecipeStatus } from './recipe-status'

/**
 * Shared recipe contract consumed by both framework implementations.
 */
export interface RecipeDefinition {
  slug: string
  title: string
  summary: string
  category: RecipeCategory
  status: RecipeStatus
  demoKey: RecipeDemoKey
  sections: RecipeSectionDefinition[]
}
