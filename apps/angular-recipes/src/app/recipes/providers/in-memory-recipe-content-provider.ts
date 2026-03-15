import { Injectable } from '@angular/core'
import { of, type Observable } from 'rxjs'

import { recipes } from '@shared/content/recipes'
import type { RecipeDefinition } from '@shared/types'
import type { RecipeContentProvider } from './recipe-content-provider'

@Injectable()
export class InMemoryRecipeContentProvider implements RecipeContentProvider {
  public getRecipes(): Observable<RecipeDefinition[]> {
    return of(recipes.filter(shouldShowRecipeInListing))
  }

  public getRecipeBySlug(slug: string): Observable<RecipeDefinition | null> {
    const recipe = recipes.find((candidate) => candidate.slug === slug)
    return of(recipe ?? null)
  }
}

function shouldShowRecipeInListing(recipe: RecipeDefinition): boolean {
  if (recipe.status === 'complete') {
    return true
  }

  return showIncompleteRecipes()
}

function showIncompleteRecipes(): boolean {
  return SHOW_INCOMPLETE_RECIPES === true
}
