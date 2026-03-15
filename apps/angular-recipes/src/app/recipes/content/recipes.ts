import { debouncedSearchRecipe } from './debounced-search-recipe'
import { permissionBasedUiRecipe } from './permission-based-ui-recipe'
import { protectedRouteRecipe } from './protected-route-recipe'

export const recipes = [
  debouncedSearchRecipe,
  permissionBasedUiRecipe,
  protectedRouteRecipe,
]
