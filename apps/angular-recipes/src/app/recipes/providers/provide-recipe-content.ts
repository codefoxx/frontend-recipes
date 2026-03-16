import type { Provider } from '@angular/core'

import { InMemoryRecipeContentProvider } from './in-memory-recipe-content-provider'
import { RECIPE_CONTENT_PROVIDER } from './recipe-content-provider.token'

/**
 * Feature-level registration for the Angular recipe content infrastructure.
 */
export function provideRecipeContent(): Provider[] {
  return [
    {
      provide: RECIPE_CONTENT_PROVIDER,
      useClass: InMemoryRecipeContentProvider,
    },
  ]
}
