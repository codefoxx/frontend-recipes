# Frontend Recipes

A side-by-side learning repository for recurring frontend problems.

The goal is not to build two unrelated demo apps. The goal is to express the
same recipes, information architecture, and user flow in **React** and
**Angular**, while still letting each app use idiomatic framework patterns.

Current recipe topics:

- debounced search
- protected routes
- permission-based UI

## Repository structure

```text
frontend-recipes/
├─ apps/
│  ├─ react-recipes/
│  └─ angular-recipes/
└─ shared/
   ├─ content/
   │  └─ recipes/
   └─ types/
```

### Design intent

- **shared/** contains framework-agnostic recipe content and contracts
- **apps/react-recipes** contains the React implementation
- **apps/angular-recipes** contains the Angular implementation
- both apps should look and behave the same from a product perspective
- both apps may differ internally where the framework encourages different
  patterns

Examples:

- both apps use a recipe service layer
- both apps use a recipe content provider abstraction
- React resolves demos through components, Angular currently resolves placeholder
  copy until framework-specific demos are added

## Tooling

### Language and build

- **TypeScript** for type safety
- **Vite** for the React app
- **Angular CLI** for the Angular app
- **shared path aliases** in both apps via `@shared/*`

### Quality gates

- **ESLint** in both apps
- **Prettier** in both apps
- **Type checking** in both apps
- **GitHub Actions** CI for lint, format, typecheck, and build
- **Husky** hooks for local pre-commit and pre-push validation

### Husky hooks

The repository uses root-level Husky hooks:

- `pre-commit`
  - runs `lint-staged` for React
  - runs Angular linting
- `pre-push`
  - runs lint, format checks, typecheck, and build for both apps

### Formatting and linting

From each app directory you can run:

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

## Development workflow

Install dependencies per app:

```bash
cd apps/react-recipes
npm install

cd ../angular-recipes
npm install
```

Run React:

```bash
cd apps/react-recipes
npm run dev
```

Run Angular:

```bash
cd apps/angular-recipes
npm run dev
```

## Incomplete recipes

Both apps intentionally hide unfinished recipes from the main listing unless a
local development flag enables them.

- React uses `VITE_SHOW_INCOMPLETE_RECIPES=true`
- Angular uses `ng serve --define SHOW_INCOMPLETE_RECIPES=true`

This keeps production-like runs clean while still allowing work-in-progress
recipes to be inspected locally.

## GitHub Actions

The CI workflow lives in `.github/workflows/ci.yml` and validates both apps.

The pipeline currently checks:

- install dependencies
- lint
- format check
- typecheck
- build

## Why the shared folder lives at repo root

The shared folder is deliberately outside the app roots.

That keeps the boundary honest:

- shared code must stay framework-agnostic
- app code owns framework-specific rendering, routing, and state management

If something becomes hard to consume from both apps, that is usually a signal
that it does **not** belong in `shared/`.
