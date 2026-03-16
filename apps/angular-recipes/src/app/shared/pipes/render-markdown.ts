function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function formatInlineMarkdown(value: string): string {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
}

/**
 * Intentionally small markdown renderer that supports only the constructs used
 * by the shared recipe content.
 */
export function renderMarkdown(markdown: string): string {
  const lines = markdown.split(/\r?\n/)
  const html: string[] = []
  let currentListItems: string[] = []
  let currentParagraph: string[] = []

  function flushList(): void {
    if (currentListItems.length === 0) {
      return
    }

    html.push(`<ul>${currentListItems.join('')}</ul>`)
    currentListItems = []
  }

  function flushParagraph(): void {
    if (currentParagraph.length === 0) {
      return
    }

    html.push(`<p>${formatInlineMarkdown(currentParagraph.join(' '))}</p>`)
    currentParagraph = []
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (line.length === 0) {
      flushParagraph()
      flushList()
      continue
    }

    if (line.startsWith('- ')) {
      flushParagraph()
      currentListItems.push(`<li>${formatInlineMarkdown(line.slice(2))}</li>`)
      continue
    }

    currentParagraph.push(line)
  }

  flushParagraph()
  flushList()

  return html.join('')
}
