import type { RecipeDefinition } from '@shared/types'

/**
 * Placeholder recipe used to prove the shared content model before the Angular
 * and React implementations are added.
 */
export const permissionBasedUiRecipe: RecipeDefinition = {
  slug: 'permission-ui',
  title: 'Permission-based UI',
  summary:
    'This recipe will demonstrate conditional UI rendering based on roles.',
  category: 'Forms & Input',
  status: 'draft',
  demoKey: 'permission-based-ui',
  sections: [
    {
      id: 'problem',
      title: 'The Problem',
      kind: 'problem',
      content: 'coming soon',
    },
  ],
}
