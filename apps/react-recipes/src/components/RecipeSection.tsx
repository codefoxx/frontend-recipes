import type { RecipeSectionDefinition } from '@shared/types'

import MarkdownContent from '@/components/MarkdownContent'

type RecipeSectionProps = {
  section: RecipeSectionDefinition
  children?: React.ReactNode
}

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
