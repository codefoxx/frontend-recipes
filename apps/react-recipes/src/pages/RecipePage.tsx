import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import RecipeSection from '@/components/RecipeSection'
import { recipeContentProvider } from '@/recipes/providers'
import RecipePageLayout from '@/recipes/RecipePageLayout'
import { demoRegistry } from '@/recipes/registry/demoRegistry'
import type { RecipeDefinition } from '@/recipes/types/RecipeDefinition'

export default function RecipePage() {
  const { slug } = useParams<{ slug: string }>()
  const [recipe, setRecipe] = useState<RecipeDefinition | null>(null)

  useEffect(() => {
    if (!slug) {
      return
    }

    recipeContentProvider.getRecipeBySlug(slug).then(setRecipe)
  }, [slug])

  if (!recipe) {
    return <p>Loading recipe...</p>
  }

  const DemoComponent = demoRegistry[recipe.demoKey]

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
