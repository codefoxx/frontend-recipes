import { Component, computed, inject } from '@angular/core'
import { toSignal } from '@angular/core/rxjs-interop'
import { ActivatedRoute } from '@angular/router'
import { map, switchMap } from 'rxjs'

import { RecipePageLayoutComponent } from '@/app/components/recipe-page-layout'
import { RecipeSectionComponent } from '@/app/components/recipe-section'
import { PlaceholderDemoComponent } from '@/app/recipes/demos/placeholder-demo'
import { demoRegistry } from '@/app/recipes/registry/demo-registry'
import type { RecipeDefinition } from '@shared/types'
import { RecipeService } from '../recipes/services/recipe-service'

@Component({
  standalone: true,
  selector: 'app-recipe-page',
  imports: [
    RecipePageLayoutComponent,
    RecipeSectionComponent,
    PlaceholderDemoComponent,
  ],
  template: `
    @if (recipe(); as currentRecipe) {
      <app-recipe-page-layout
        [title]="currentRecipe.title"
        [description]="currentRecipe.summary"
      >
        @for (section of currentRecipe.sections; track section.id) {
          <app-recipe-section [section]="section">
            @if (section.kind === 'demo') {
              <div class="recipe-demo">
                <app-placeholder-demo [message]="demoMessage()" />
              </div>
            }
          </app-recipe-section>
        }
      </app-recipe-page-layout>
    } @else {
      <p>Loading recipe...</p>
    }
  `,
})
export class RecipePageComponent {
  private readonly route = inject(ActivatedRoute)
  private readonly recipeService = inject(RecipeService)

  public readonly recipe = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('slug')),
      switchMap((slug) => this.recipeService.getRecipeBySlug(slug ?? ''))
    ),
    { initialValue: null as RecipeDefinition | null }
  )

  public readonly demoMessage = computed(() => {
    const recipe = this.recipe()

    if (!recipe) {
      return 'Demo coming soon.'
    }

    return demoRegistry[recipe.demoKey]
  })
}
