import { recipes } from '../content/recipes'
import type { RecipeDefinition } from '../types/RecipeDefinition'
import type { RecipeContentProvider } from './RecipeContentProvider'

export class InMemoryRecipeContentProvider implements RecipeContentProvider {
  public async getRecipes(): Promise<RecipeDefinition[]> {
    return recipes
  }

  public async getRecipeBySlug(slug: string): Promise<RecipeDefinition | null> {
    const recipe = recipes.find((candidate) => candidate.slug === slug)

    return recipe ?? null
  }
}
