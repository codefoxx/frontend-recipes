import type { RecipeDefinition } from '@shared/types'

export interface RecipeContentProvider {
  getRecipes(): Promise<RecipeDefinition[]>
  getRecipeBySlug(slug: string): Promise<RecipeDefinition | null>
}
