# Angular Recipes

Angular implementation of the Frontend Recipes repository.

## Architecture

The Angular app follows the same conceptual flow as the React app:

```text
page → service → content provider → shared recipe content
```

Main concepts:

- **pages/** own route-level UI
- **components/** own reusable page building blocks
- **recipes/services/** provide a thin UI-facing façade
- **recipes/providers/** encapsulate access to shared recipe content and are
  wired through Angular DI
- **recipes/registry/** resolves framework-specific placeholder demo copy

## Scripts

- `npm run dev` starts the Angular dev server with incomplete recipes visible
- `npm run start` starts the Angular dev server without the local dev flag
- `npm run build` creates a production build
- `npm run typecheck` runs TypeScript type checking
- `npm run lint` runs ESLint
- `npm run format` formats the project with Prettier
- `npm run format:check` verifies formatting

## Notes

The Angular app intentionally mirrors the React scaffolding, but still uses
Angular-native patterns such as standalone components, `inject()`, signals, and
provider registration via the application composition root.
