import { recipes } from '@shared/content/recipes'
import type { RecipeDefinition } from '@shared/types'

import type { RecipeContentProvider } from './RecipeContentProvider'

function shouldShowRecipeInListing(recipe: RecipeDefinition): boolean {
  if (recipe.status === 'complete') {
    return true
  }

  return import.meta.env.VITE_SHOW_INCOMPLETE_RECIPES === 'true'
}

export class InMemoryRecipeContentProvider implements RecipeContentProvider {
  public async getRecipes(): Promise<RecipeDefinition[]> {
    return recipes.filter(shouldShowRecipeInListing)
  }

  public async getRecipeBySlug(slug: string): Promise<RecipeDefinition | null> {
    const recipe = recipes.find((candidate) => candidate.slug === slug)

    return recipe ?? null
  }
}
