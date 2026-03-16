import { InjectionToken } from '@angular/core'

import type { RecipeContentProvider } from './recipe-content-provider'

/**
 * Runtime injection token for the recipe content provider abstraction.
 */
export const RECIPE_CONTENT_PROVIDER =
  new InjectionToken<RecipeContentProvider>('RECIPE_CONTENT_PROVIDER')
