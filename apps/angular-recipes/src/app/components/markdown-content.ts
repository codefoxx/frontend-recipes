import { Component, computed, input } from '@angular/core'

import { renderMarkdown } from '@/app/shared/pipes/render-markdown'

/**
 * Lightweight markdown renderer used to keep the Angular scaffold dependency
 * surface intentionally small.
 *
 * The shared recipe content is treated as trusted source content from this
 * repository. `renderMarkdown` escapes raw HTML and emits only a very small set
 * of tags that Angular can safely sanitize again when binding to `innerHTML`.
 */
@Component({
  standalone: true,
  selector: 'app-markdown-content',
  template: `<div class="markdown-content" [innerHTML]="html()"></div>`,
})
export class MarkdownContentComponent {
  public readonly content = input.required<string>()

  public readonly html = computed(() => renderMarkdown(this.content()))
}
