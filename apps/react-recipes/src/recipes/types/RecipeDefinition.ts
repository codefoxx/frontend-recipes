import type { RecipeCategory } from './RecipeCategory'
import type { RecipeDemoKey } from './RecipeDemoKey'
import type { RecipeSectionDefinition } from './RecipeSectionDefinition'
import type { RecipeStatus } from './RecipeStatus'

export interface RecipeDefinition {
  slug: string
  title: string
  summary: string
  category: RecipeCategory
  status: RecipeStatus
  demoKey: RecipeDemoKey
  sections: RecipeSectionDefinition[]
}
