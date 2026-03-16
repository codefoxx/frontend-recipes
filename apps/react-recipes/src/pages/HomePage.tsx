import type { RecipeDefinition } from '@shared/types'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import logo from '@/assets/logo.svg'
import { recipeService } from '@/recipes/services'

/**
 * Landing page that lists all visible recipes for the React application.
 */
export default function HomePage() {
  const [recipes, setRecipes] = useState<RecipeDefinition[]>([])

  useEffect(() => {
    recipeService.getRecipes().then(setRecipes)
  }, [])

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
              <p>{recipe.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
