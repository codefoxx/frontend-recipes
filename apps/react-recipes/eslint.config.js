/**
 * ESLint configuration for the React + TypeScript frontend.
 *
 * We use the ESLint "flat config" API introduced in ESLint v9.
 * This replaces the traditional .eslintrc files and allows
 * configuration using standard JavaScript modules.
 *
 * Goals of this setup:
 *
 * - enforce consistent code quality rules
 * - catch common React / TypeScript mistakes early
 * - integrate cleanly with Prettier for formatting
 * - keep the configuration minimal and explicit
 */

import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  /**
   * Global ignores.
   * Build artifacts should never be linted.
   */
  { ignores: ['dist'] },

  {
    /**
     * Only lint TypeScript source files.
     */
    files: ['**/*.{ts,tsx}'],

    /**
     * Base rule sets used in this project.
     *
     * Order matters:
     * - core JS rules
     * - TypeScript rules
     * - Prettier (must be last to disable formatting conflicts)
     */
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier,
    ],

    /**
     * Language configuration.
     */
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    /**
     * Plugins add additional rule sets.
     */
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
    },

    /**
     * Project specific rule configuration.
     */
    rules: {
      /**
       * Enforce correct usage of React hooks.
       */
      ...reactHooks.configs.recommended.rules,

      /**
       * Ensures components remain compatible with
       * React Fast Refresh during development.
       */
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      /**
       * Keep import/export ordering deterministic across editor, hooks and CI.
       */
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
)
