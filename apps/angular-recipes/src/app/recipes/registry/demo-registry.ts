import type { RecipeDemoKey } from '@shared/types'

/**
 * Resolves the placeholder copy shown for Angular demos that have not yet been
 * implemented.
 */
export const demoRegistry: Record<RecipeDemoKey, string> = {
  'debounced-search': 'Angular debounced search demo will be added next.',
  'permission-based-ui': 'Angular permission-based UI demo coming soon.',
  'protected-route': 'Angular protected route demo coming soon.',
}
