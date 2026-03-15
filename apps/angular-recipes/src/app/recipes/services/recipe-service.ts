import { inject, Injectable } from '@angular/core'
import type { Observable } from 'rxjs'

import type { RecipeDefinition } from '@shared/types'
import type { RecipeContentProvider } from '../providers/recipe-content-provider'
import { RECIPE_CONTENT_PROVIDER } from '../providers/recipe-content-provider.token'
import { demoRegistry } from '../registry/demo-registry'

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly recipeContentProvider: RecipeContentProvider = inject(
    RECIPE_CONTENT_PROVIDER
  )

  public getRecipes(): Observable<RecipeDefinition[] | null> {
    return this.recipeContentProvider.getRecipes()
  }

  public getRecipeBySlug(slug: string): Observable<RecipeDefinition | null> {
    return this.recipeContentProvider.getRecipeBySlug(slug)
  }

  public getDemoMessage(recipe: RecipeDefinition | null): string {
    if (!recipe) {
      return 'Demo coming soon.'
    }

    return demoRegistry[recipe.demoKey]
  }
}
