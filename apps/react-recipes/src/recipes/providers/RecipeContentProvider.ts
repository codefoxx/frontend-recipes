import type { RecipeDefinition } from '../types/RecipeDefinition'

export interface RecipeContentProvider {
  getRecipes(): Promise<RecipeDefinition[]>
  getRecipeBySlug(slug: string): Promise<RecipeDefinition | null>
}
