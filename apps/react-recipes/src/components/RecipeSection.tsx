import type { RecipeSectionDefinition } from '@shared/types'
import type { ReactNode } from 'react'

import MarkdownContent from '@/components/MarkdownContent'

type RecipeSectionProps = {
  section: RecipeSectionDefinition
  children?: ReactNode
}

/**
 * Renders a single recipe section and optionally hosts a demo component.
 */
export default function RecipeSection({
  section,
  children,
}: RecipeSectionProps) {
  return (
    <section className="recipe-section">
      <h2 className="recipe-section__title">{section.title}</h2>
      <div className="recipe-section__content">
        <MarkdownContent content={section.content} />
      </div>
      {children}
    </section>
  )
}
