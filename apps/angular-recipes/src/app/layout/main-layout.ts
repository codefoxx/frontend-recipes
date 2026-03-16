import { Component } from '@angular/core'

/**
 * Top-level layout shared by all Angular routes.
 */
@Component({
  standalone: true,
  selector: 'app-main-layout',
  template: `
    <div class="app">
      <main class="content">
        <ng-content />
      </main>

      <footer class="footer">
        <small>Frontend Recipes – Angular / TypeScript patterns</small>
      </footer>
    </div>
  `,
})
export class MainLayoutComponent {}
