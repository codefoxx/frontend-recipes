import { Component, inject } from '@angular/core'
import { RouterLink } from '@angular/router'
import { toSignal } from '@angular/core/rxjs-interop'

import { RecipeContentProvider } from '@/app/recipes/providers/recipe-content-provider'

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
          Practical TypeScript / Angular patterns for recurring frontend problems.
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
  providers: [RecipeContentProvider],
})
export class HomePageComponent {
  private readonly recipeContentProvider = inject(RecipeContentProvider)

  public readonly recipes = toSignal(this.recipeContentProvider.getRecipes(), {
    initialValue: [],
  })
}
