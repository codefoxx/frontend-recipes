import { Component, computed, input } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

import { renderMarkdown } from '@/app/shared/pipes/render-markdown'

@Component({
  standalone: true,
  selector: 'app-markdown-content',
  template: `<div class="markdown-content" [innerHTML]="html()"></div>`,
})
export class MarkdownContentComponent {
  public readonly content = input.required<string>()

  public readonly html = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(renderMarkdown(this.content()))
  )

  public constructor(private readonly sanitizer: DomSanitizer) {}
}
