import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type RecipePageLayoutProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export default function RecipePageLayout({
  title,
  description,
  children,
}: RecipePageLayoutProps) {
  return (
    <section className="recipe-page">
      <div className="recipe-page__container">
        <Link className="recipe-page__back" to="/">
          ← Back to recipes
        </Link>

        <header className="recipe-page__header">
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </header>

        <div className="recipe-page__content">{children}</div>
      </div>
    </section>
  );
}