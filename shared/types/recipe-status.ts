/**
 * Publication state of a recipe.
 *
 * Draft and in-progress recipes can be hidden from listings in production-like
 * runs while remaining available during local development.
 */
export type RecipeStatus = 'draft' | 'in-progress' | 'complete'
