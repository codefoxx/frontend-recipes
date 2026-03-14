import { Link } from 'react-router-dom'
import { recipes } from '../recipes/registry'
import logo from '../assets/logo.svg'

export default function HomePage() {
  return (
    <div>
      <header className="header">
        <div className="hero-brand">
          <img src={logo} className="logo" alt="Frontend Recipes logo" />
        </div>
        <h1>Frontend Recipes</h1>
      </header>
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
    </div>
  )
}
