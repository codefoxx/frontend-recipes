import RecipeSection from '@/components/RecipeSection'

export default function Problem() {
  return (
    <RecipeSection
      title="The Problem"
      description="Why naive search implementations cause unnecessary API calls."
    >
      <p>
        A naive search implementation sends a request on every keystroke. When
        users type quickly, this can produce a burst of unnecessary network
        requests before they have even finished entering their query.
      </p>

      <ul className="recipe-list">
        <li>Unnecessary network traffic</li>
        <li>Increased backend load</li>
        <li>UI flickering and noisy loading states</li>
        <li>Risk of stale or out-of-order results</li>
      </ul>
    </RecipeSection>
  )
}
