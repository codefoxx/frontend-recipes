import type { ComponentType } from 'react'

import PlaceholderDemo from '../demos/PlaceholderDemo'
import type { RecipeDemoKey } from '../types/RecipeDemoKey'

export const demoRegistry: Record<RecipeDemoKey, ComponentType> = {
  'debounced-search': PlaceholderDemo,
  'protected-route': PlaceholderDemo,
  'permission-based-ui': PlaceholderDemo,
}
