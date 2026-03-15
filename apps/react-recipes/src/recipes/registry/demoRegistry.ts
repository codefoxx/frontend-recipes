import type { ComponentType } from 'react'

import DebouncedSearchDemo from '../demos/debounced-search/DebouncedSearchDemo'
import PlaceholderDemo from '../demos/PlaceholderDemo'
import type { RecipeDemoKey } from '../types/RecipeDemoKey'

export const demoRegistry: Record<RecipeDemoKey, ComponentType> = {
  'debounced-search': DebouncedSearchDemo,
  'protected-route': PlaceholderDemo,
  'permission-based-ui': PlaceholderDemo,
}
