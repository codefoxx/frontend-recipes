import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.svg";

export default function MainLayout() {
  return (
    <div className="app">
      <header className="header">
      <div className="hero-brand">
        <img src={logo} className="logo" alt="Frontend Recipes logo" />
      </div>
      <h1>Frontend Recipes</h1>
    </header>

      <main className="content">
        <Outlet />
      </main>

      <footer className="footer">
        <small>Frontend Recipes – React / TypeScript patterns</small>
      </footer>
    </div>
  );
}