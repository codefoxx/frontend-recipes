import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'

import { recipes } from '@/app/recipes/content/recipes'
import { RecipeDefinition } from '@/app/recipes/types/recipe-definition'

@Injectable()
export class RecipeContentProvider {
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

  return false
}
