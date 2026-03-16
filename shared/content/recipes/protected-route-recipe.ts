import type { RecipeDefinition } from '@shared/types'

/**
 * Placeholder recipe used to reserve the route and demo key for the protected
 * route comparison.
 */
export const protectedRouteRecipe: RecipeDefinition = {
  slug: 'protected-route',
  title: 'Protected Route',
  summary:
    'This recipe will demonstrate route guarding based on authentication.',
  category: 'Forms & Input',
  status: 'draft',
  demoKey: 'protected-route',
  sections: [
    {
      id: 'problem',
      title: 'The Problem',
      kind: 'problem',
      content: 'coming soon',
    },
  ],
}
