import { Link } from "react-router-dom";
import { recipes } from "../recipes/registry";

export default function HomePage() {
  return (
    <section className="hero">
      <p className="subtitle">
        Practical TypeScript / React patterns for recurring frontend problems.
      </p>

      <div className="recipes">
        {recipes.map((recipe) => (
          <Link
            key={recipe.slug}
            className="recipe-card"
            to={`/recipes/${recipe.slug}`}
          >
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}