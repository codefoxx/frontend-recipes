import { Component, input } from '@angular/core'
import { RouterLink } from '@angular/router'

/**
 * Shared page shell for recipe details.
 */
@Component({
  standalone: true,
  selector: 'app-recipe-page-layout',
  imports: [RouterLink],
  template: `
    <section class="recipe-page">
      <div class="recipe-page__container">
        <a class="recipe-page__back" routerLink="/">← Back to recipes</a>

        <header class="recipe-page__header">
          <h2>{{ title() }}</h2>
          @if (description()) {
            <p>{{ description() }}</p>
          }
        </header>

        <div class="recipe-page__content">
          <ng-content />
        </div>
      </div>
    </section>
  `,
})
export class RecipePageLayoutComponent {
  public readonly title = input.required<string>()
  public readonly description = input<string>()
}
