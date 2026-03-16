import { Outlet } from 'react-router-dom'

/**
 * Top-level layout shared by all React routes.
 */
export default function MainLayout() {
  return (
    <div className="app">
      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">
        <small>Frontend Recipes – React / TypeScript patterns</small>
      </footer>
    </div>
  )
}
