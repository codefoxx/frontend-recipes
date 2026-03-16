import type { RecipeDefinition } from '@shared/types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import RecipePageLayout from '@/components/RecipePageLayout'
import RecipeSection from '@/components/RecipeSection'
import { recipeService } from '@/recipes/services'

/**
 * Recipe detail page for the React app.
 */
export default function RecipePage() {
  const { slug } = useParams<{ slug: string }>()
  const [recipe, setRecipe] = useState<RecipeDefinition | null>(null)

  useEffect(() => {
    if (!slug) {
      return
    }

    recipeService.getRecipeBySlug(slug).then(setRecipe)
  }, [slug])

  if (!recipe) {
    return <p>Loading recipe...</p>
  }

  const DemoComponent = recipeService.getDemoComponent(recipe)

  return (
    <RecipePageLayout title={recipe.title} description={recipe.summary}>
      {recipe.sections.map((section) => (
        <RecipeSection key={section.id} section={section}>
          {section.kind === 'demo' && <DemoComponent />}
        </RecipeSection>
      ))}
    </RecipePageLayout>
  )
}
