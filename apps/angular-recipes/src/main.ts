import { bootstrapApplication } from '@angular/platform-browser'
import { provideRouter } from '@angular/router'

import { AppComponent } from '@/app/app'
import { routes } from '@/app/router/routes'

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
}).catch((error: unknown) => {
  console.error(error)
})
