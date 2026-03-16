import { Component, input } from '@angular/core'

/**
 * Temporary demo used until a recipe has a framework-specific implementation.
 */
@Component({
  standalone: true,
  selector: 'app-placeholder-demo',
  template: `
    <div class="recipe-demo-placeholder">
      <p>{{ message() }}</p>
    </div>
  `,
})
export class PlaceholderDemoComponent {
  public readonly message = input('Angular demo coming soon.')
}
