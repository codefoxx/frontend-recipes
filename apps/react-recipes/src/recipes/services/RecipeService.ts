import type { RecipeDefinition } from '@shared/types'
import type { ComponentType } from 'react'

import { recipeContentProvider } from '@/recipes/providers'
import { demoRegistry } from '@/recipes/registry/demoRegistry'

/**
 * Small façade that keeps React pages aligned with the Angular page → service →
 * provider flow.
 */
export class RecipeService {
  public async getRecipes(): Promise<RecipeDefinition[]> {
    return recipeContentProvider.getRecipes()
  }

  public async getRecipeBySlug(slug: string): Promise<RecipeDefinition | null> {
    return recipeContentProvider.getRecipeBySlug(slug)
  }

  public getDemoComponent(recipe: RecipeDefinition): ComponentType {
    return demoRegistry[recipe.demoKey]
  }
}
