import type { RecipeDefinition } from '@shared/types'

import { debouncedSearchRecipe } from './debounced-search-recipe'
import { permissionBasedUiRecipe } from './permission-based-ui-recipe'
import { protectedRouteRecipe } from './protected-route-recipe'

/**
 * Shared recipe catalogue consumed by both framework applications.
 */
export const recipes: RecipeDefinition[] = [
  debouncedSearchRecipe,
  permissionBasedUiRecipe,
  protectedRouteRecipe,
]
