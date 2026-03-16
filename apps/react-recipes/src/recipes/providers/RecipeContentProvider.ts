import type { RecipeDefinition } from '@shared/types'

/**
 * Data access abstraction for recipe metadata and content in the React app.
 */
export interface RecipeContentProvider {
  getRecipes(): Promise<RecipeDefinition[]>
  getRecipeBySlug(slug: string): Promise<RecipeDefinition | null>
}
