import { Component } from '@angular/core'

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
