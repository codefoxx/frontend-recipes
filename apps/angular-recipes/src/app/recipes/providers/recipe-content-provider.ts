import type { Observable } from 'rxjs'

import type { RecipeDefinition } from '@shared/types'

/**
 * Data access abstraction for recipe metadata and content in the Angular app.
 */
export interface RecipeContentProvider {
  getRecipes(): Observable<RecipeDefinition[]>
  getRecipeBySlug(slug: string): Observable<RecipeDefinition | null>
}
