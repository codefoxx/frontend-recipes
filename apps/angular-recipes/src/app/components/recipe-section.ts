import { Component, input } from '@angular/core'

import type { RecipeSectionDefinition } from '@shared/types'

import { MarkdownContentComponent } from './markdown-content'

/**
 * Renders a single recipe section and optionally hosts a demo component.
 */
@Component({
  standalone: true,
  selector: 'app-recipe-section',
  imports: [MarkdownContentComponent],
  template: `
    <section class="recipe-section">
      <h2 class="recipe-section__title">{{ section().title }}</h2>
      <div class="recipe-section__content">
        <app-markdown-content [content]="section().content" />
      </div>
      <ng-content />
    </section>
  `,
})
export class RecipeSectionComponent {
  public readonly section = input.required<RecipeSectionDefinition>()
}
