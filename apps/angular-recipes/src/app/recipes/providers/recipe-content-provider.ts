import type { RecipeDefinition } from '@shared/types'
import type { Observable } from 'rxjs'

export interface RecipeContentProvider {
  getRecipes(): Observable<RecipeDefinition[]>
  getRecipeBySlug(slug: string): Observable<RecipeDefinition | null>
}
