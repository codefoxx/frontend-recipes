import type { RecipeDemoKey } from '@shared/types'
import type { ComponentType } from 'react'

import DebouncedSearchDemo from '../demos/debounced-search/DebouncedSearchDemo'
import PlaceholderDemo from '../demos/PlaceholderDemo'

/**
 * Resolves the concrete React demo component for a shared recipe key.
 */
export const demoRegistry: Record<RecipeDemoKey, ComponentType> = {
  'debounced-search': DebouncedSearchDemo,
  'protected-route': PlaceholderDemo,
  'permission-based-ui': PlaceholderDemo,
}
