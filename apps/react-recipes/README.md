# React Recipes

React implementation of the Frontend Recipes repository.

## Architecture

The React app follows this flow:

```text
page → service → content provider → shared recipe content
```

Main concepts:

- **pages/** own route-level UI
- **components/** own reusable page building blocks
- **recipes/services/** provide a thin UI-facing façade
- **recipes/providers/** encapsulate access to shared recipe content
- **recipes/registry/** resolves framework-specific demo components

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` runs TypeScript build checks and creates a production bundle
- `npm run lint` runs ESLint
- `npm run format` formats the project with Prettier
- `npm run format:check` verifies formatting
- `npm run preview` previews the production build locally

## Notes

The React app currently contains the most complete interactive demo:
`debounced-search`.
