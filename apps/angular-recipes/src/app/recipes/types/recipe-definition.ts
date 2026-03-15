import { RecipeCategory } from './recipe-category'
import { RecipeDemoKey } from './recipe-demo-key'
import { RecipeSectionDefinition } from './recipe-section-definition'
import { RecipeStatus } from './recipe-status'

export interface RecipeDefinition {
  slug: string
  title: string
  summary: string
  category: RecipeCategory
  status: RecipeStatus
  demoKey: RecipeDemoKey
  sections: RecipeSectionDefinition[]
}
