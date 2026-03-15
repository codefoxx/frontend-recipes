import type { RecipeDefinition } from '../types/RecipeDefinition'
import { debouncedSearchRecipe } from './debouncedSearchRecipe'
import { permissionBasesUiRecipe } from './permissionBasedUiRecipe'
import { protectedRouteRecipe } from './protectedRoute'

export const recipes: RecipeDefinition[] = [
  debouncedSearchRecipe,
  permissionBasesUiRecipe,
  protectedRouteRecipe,
]
