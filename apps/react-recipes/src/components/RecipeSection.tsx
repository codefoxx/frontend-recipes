import type { ReactNode } from 'react'

type RecipeSectionProps = {
  title: string
  description?: string
  children: ReactNode
}

export default function RecipeSection({
  title,
  description,
  children,
}: RecipeSectionProps) {
  return (
    <section className="recipe-section">
      <h2 className="recipe-section-title">{title}</h2>

      {description && (
        <p className="recipe-section-description">{description}</p>
      )}

      <div className="recipe-section-content">{children}</div>
    </section>
  )
}
