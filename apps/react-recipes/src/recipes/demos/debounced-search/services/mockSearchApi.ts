/**
 * Mock search API used by the debounced search recipe.
 *
 * Why this file exists:
 * - We want a realistic async boundary without depending on a real backend.
 * - We want to make request timing visible so the difference between
 *   a naive and a debounced implementation becomes obvious.
 *
 * Design choices:
 * - The dataset is intentionally small and static.
 * - Search is case-insensitive and uses simple substring matching.
 * - Latency is deterministic per query instead of random.
 *
 * Why latency is deterministic:
 * - Both implementations should be compared under the same timing conditions.
 * - A random delay per request could create the false impression that one
 *   implementation is "faster", even though the real difference is request
 *   frequency and UI stability.
 * - By deriving latency from the query itself, the demo stays reproducible
 *   and easier to reason about.
 *
 * Non-goals:
 * - This is not meant to model ranking, pagination, fuzzy matching,
 *   authentication, or backend-specific concerns.
 */

export interface SearchItem {
  id: string
  label: string
  category: string
}

export interface SearchResponse {
  query: string
  results: SearchItem[]
  durationMs: number
}

const SEARCH_INDEX: SearchItem[] = [
  { id: '1', label: 'React', category: 'Library' },
  { id: '2', label: 'React Router', category: 'Library' },
  { id: '3', label: 'Redux', category: 'Library' },
  { id: '4', label: 'TypeScript', category: 'Language' },
  { id: '5', label: 'JavaScript', category: 'Language' },
  { id: '6', label: 'Vite', category: 'Build Tool' },
  { id: '7', label: 'Vitest', category: 'Testing' },
  { id: '8', label: 'Playwright', category: 'Testing' },
  { id: '9', label: 'Jest', category: 'Testing' },
  { id: '10', label: 'Cypress', category: 'Testing' },
  { id: '11', label: 'Angular', category: 'Framework' },
  { id: '12', label: 'Vue', category: 'Framework' },
  { id: '13', label: 'Svelte', category: 'Framework' },
  { id: '14', label: 'Node.js', category: 'Runtime' },
  { id: '15', label: 'Express', category: 'Backend' },
  { id: '16', label: 'Next.js', category: 'Framework' },
  { id: '17', label: 'Remix', category: 'Framework' },
  { id: '18', label: 'Tailwind CSS', category: 'Styling' },
  { id: '19', label: 'CSS Modules', category: 'Styling' },
  { id: '20', label: 'ESLint', category: 'Tooling' },
  { id: '21', label: 'Prettier', category: 'Tooling' },
  { id: '22', label: 'Storybook', category: 'Tooling' },
  { id: '23', label: 'TanStack Query', category: 'Data Fetching' },
  { id: '24', label: 'Zod', category: 'Validation' },
  { id: '25', label: 'React Hook Form', category: 'Forms' },
]

const MIN_DELAY_MS = 250
const MAX_DELAY_MS = 650
const MAX_RESULTS = 8

/**
 * Normalizes user input for matching and latency calculation.
 *
 * Trimming and lowercasing are enough for this demo.
 * We keep the behavior intentionally simple so the recipe stays focused
 * on request timing and UI behavior rather than search semantics.
 */
function normalize(value: string): string {
  return value.trim().toLowerCase()
}

/**
 * Derives a stable artificial latency from the query text.
 *
 * The same normalized query always results in the same delay.
 * That keeps the comparison fair across the naive and debounced versions.
 */
function getDeterministicDelayMs(query: string): number {
  const normalizedQuery = normalize(query)

  if (!normalizedQuery) {
    return MIN_DELAY_MS
  }

  /**
   * A tiny string hash is enough here.
   *
   * We do not need cryptographic quality or perfect distribution.
   * We only need a stable value that spreads queries across the delay range.
   */
  const hash = Array.from(normalizedQuery).reduce((sum, character) => {
    return sum + character.charCodeAt(0)
  }, 0)

  const delayRange = MAX_DELAY_MS - MIN_DELAY_MS

  return MIN_DELAY_MS + (hash % (delayRange + 1))
}

/**
 * Returns matching search items for the provided query.
 *
 * Matching rules:
 * - empty queries return no results
 * - label and category are both searchable
 * - results are limited to keep the UI compact and readable
 */
function findMatches(query: string): SearchItem[] {
  const normalizedQuery = normalize(query)

  if (!normalizedQuery) {
    return []
  }

  return SEARCH_INDEX.filter((item) => {
    const searchableText = `${item.label} ${item.category}`.toLowerCase()

    return searchableText.includes(normalizedQuery)
  }).slice(0, MAX_RESULTS)
}

/**
 * Performs an asynchronous mock search.
 *
 * Even though the data is local, we return a Promise to model the same
 * async boundary a real UI would face when calling a backend.
 */
export async function searchTopics(query: string): Promise<SearchResponse> {
  const startedAt = performance.now()
  const delayMs = getDeterministicDelayMs(query)

  await new Promise<void>((resolve) => {
    setTimeout(resolve, delayMs)
  })

  const results = findMatches(query)
  const durationMs = Math.round(performance.now() - startedAt)

  return {
    query,
    results,
    durationMs,
  }
}
