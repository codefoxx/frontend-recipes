import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

import { MainLayoutComponent } from '@/app/layout/main-layout'

/**
 * Root component for the Angular application.
 */
@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, MainLayoutComponent],
  template: `
    <app-main-layout>
      <router-outlet />
    </app-main-layout>
  `,
})
export class AppComponent {}
