import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from '@/app/router/routes'
import { provideRecipeContent } from './recipes/providers/provide-recipe-content'

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ...provideRecipeContent()],
}
