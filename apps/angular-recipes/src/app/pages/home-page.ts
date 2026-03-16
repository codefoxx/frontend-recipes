import { Component, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { RouterLink } from '@angular/router'

import { RecipeService } from '@/app/recipes/services/recipe-service'

/**
 * Landing page that lists all visible recipes for the Angular application.
 */
@Component({
  standalone: true,
  selector: 'app-home-page',
  imports: [RouterLink],
  template: `
    <div>
      <header class="header">
        <div class="hero-brand">
          <img src="assets/logo.svg" class="logo" alt="Frontend Recipes logo" />
        </div>
        <h1>Frontend Recipes</h1>
      </header>

      <section class="hero">
        <p class="subtitle">
          Practical TypeScript / Angular patterns for recurring frontend
          problems.
        </p>

        <div class="recipes">
          @for (recipe of recipes(); track recipe.slug) {
            <a class="recipe-card" [routerLink]="['/recipes', recipe.slug]">
              <h3>{{ recipe.title }}</h3>
              <p>{{ recipe.summary }}</p>
            </a>
          }
        </div>
      </section>
    </div>
  `,
})
export class HomePageComponent {
  private readonly recipeService = inject(RecipeService)

  public readonly recipes = toSignal(this.recipeService.getRecipes(), {
    initialValue: [],
  })
}
