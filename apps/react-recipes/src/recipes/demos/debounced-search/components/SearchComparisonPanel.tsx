import type { ReactNode } from 'react'
import { useState } from 'react'

/**
 * Provides the shared input and the two-column comparison layout for the
 * debounced search recipe.
 *
 * Why this component owns the input:
 * - Both implementations should react to the exact same user input.
 * - That makes the behavioral difference immediately visible.
 * - The comparison becomes fair because timing and typing speed are identical.
 *
 * Responsibilities:
 * - manage the shared query state
 * - expose an explicit reset signal
 * - provide a consistent side-by-side layout
 *
 * Non-goals:
 * - no search logic lives here
 * - no request handling lives here
 * - no debouncing logic lives here
 */
interface Props {
  leftTitle: string
  rightTitle: string
  leftDescription?: string
  rightDescription?: string
  renderLeft: (query: string, resetVersion: number) => ReactNode
  renderRight: (query: string, resetVersion: number) => ReactNode
}

export default function SearchComparisonPanel({
  leftTitle,
  rightTitle,
  leftDescription,
  rightDescription,
  renderLeft,
  renderRight,
}: Props) {
  const [query, setQuery] = useState('')
  const [resetVersion, setResetVersion] = useState(0)

  function handleClear(): void {
    setQuery('')
    setResetVersion((current) => current + 1)
  }

  return (
    <section className="comparison">
      <div className="comparison__intro">
        <p className="comparison__hint">
          Try typing quickly, for example: <strong>react</strong>,{' '}
          <strong>router</strong> or <strong>typescript</strong>.
        </p>

        <div className="comparison__controls">
          <label
            className="comparison__label"
            htmlFor="comparison-search-input"
          >
            Shared search input
          </label>

          <div className="comparison__input-row">
            <input
              id="comparison-search-input"
              className="comparison__input"
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Type here to compare both implementations"
              autoComplete="off"
            />

            <button
              type="button"
              className="comparison__clear"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="comparison__grid">
        <div className="comparison__column">
          <header className="comparison__header">
            <h4 className="comparison__title">{leftTitle}</h4>
            {leftDescription ? (
              <p className="comparison__description">{leftDescription}</p>
            ) : null}
          </header>

          <div className="comparison__content">
            {renderLeft(query, resetVersion)}
          </div>
        </div>

        <div className="comparison__column">
          <header className="comparison__header">
            <h4 className="comparison__title">{rightTitle}</h4>
            {rightDescription ? (
              <p className="comparison__description">{rightDescription}</p>
            ) : null}
          </header>

          <div className="comparison__content">
            {renderRight(query, resetVersion)}
          </div>
        </div>
      </div>
    </section>
  )
}
