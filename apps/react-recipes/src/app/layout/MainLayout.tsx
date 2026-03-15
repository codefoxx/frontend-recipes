import { Outlet } from 'react-router-dom'

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
