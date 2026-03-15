import { InjectionToken } from '@angular/core'
import type { RecipeContentProvider } from './recipe-content-provider'

export const RECIPE_CONTENT_PROVIDER =
  new InjectionToken<RecipeContentProvider>('RECIPE_CONTENT_PROVIDER')
