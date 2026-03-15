import { debouncedSearchRecipe } from "./debouncedSearchRecipe";
import { permissionBasedUiRecipe } from "./permissionBasedUiRecipe";
import { protectedRouteRecipe } from "./protectedRoute";

import type { RecipeDefinition } from "../../types";

export const recipes: RecipeDefinition[] = [
  debouncedSearchRecipe,
  permissionBasedUiRecipe,
  protectedRouteRecipe,
];
