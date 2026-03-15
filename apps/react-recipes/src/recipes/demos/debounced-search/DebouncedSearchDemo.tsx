import './styles/debounced-search.css'

import { useMemo, useState } from 'react'

import DebouncedSearchExample from './components/DebouncedSearchExample'
import NaiveSearchExample from './components/NaiveSearchExample'
import SearchComparisonPanel from './components/SearchComparisonPanel'

/**
 * Interactive demo for the debounced search recipe.
 *
 * Why this component exists:
 * - The recipe should not only describe the problem and solution in text.
 * - It should let the reader observe the difference directly.
 *
 * Structure:
 * - Compare tab: live side-by-side comparison with shared input
 * - Code tab: curated snippets that highlight the implementation difference
 *
 * The demo owns the local tab state and acts as the orchestration point for
 * the feature-specific UI.
 */
export default function DebouncedSearchDemo() {
  const [activeTab, setActiveTab] = useState<'compare' | 'code'>('compare')

  /**
   * The code samples are intentionally curated.
   *
   * We want the reader to focus on the essential behavioral difference rather
   * than on every implementation detail of the full files.
   */
  const codeSamples = useMemo(
    () => ({
      naive: `useEffect(() => {
  if (!query.trim()) {
    setResults([])
    setIsLoading(false)
    return
  }

  setIsLoading(true)

  void searchTopics(query).then((response) => {
    setResults(response.results)
    setIsLoading(false)
  })
}, [query])`,
      debounced: `const debouncedQuery = useDebouncedValue(query, 300)

useEffect(() => {
  if (!debouncedQuery.trim()) {
    return
  }

  setIsLoading(true)

  void searchTopics(debouncedQuery).then((response) => {
    setResults(response.results)
    setIsLoading(false)
  })
}, [debouncedQuery])`,
    }),
    [],
  )

  return (
    <section className="debounced-search-demo">
      <header className="debounced-search-demo__header">
        <div>
          <h3 className="debounced-search-demo__title">
            Interactive comparison
          </h3>
          <p className="debounced-search-demo__description">
            Compare both implementations with the exact same input and typing
            speed.
          </p>
        </div>

        <div
          className="debounced-search-demo__tabs"
          role="tablist"
          aria-label="Debounced search demo tabs"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'compare'}
            className={`debounced-search-demo__tab ${
              activeTab === 'compare'
                ? 'debounced-search-demo__tab--active'
                : ''
            }`}
            onClick={() => setActiveTab('compare')}
          >
            Compare
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'code'}
            className={`debounced-search-demo__tab ${
              activeTab === 'code' ? 'debounced-search-demo__tab--active' : ''
            }`}
            onClick={() => setActiveTab('code')}
          >
            Code
          </button>
        </div>
      </header>

      {activeTab === 'compare' ? (
        <SearchComparisonPanel
          leftTitle="Naive implementation"
          leftDescription="Every keystroke triggers a request immediately."
          rightTitle="Debounced implementation"
          rightDescription="Requests are only sent after the user pauses typing briefly."
          renderLeft={(query, resetVersion) => (
            <NaiveSearchExample query={query} resetVersion={resetVersion} />
          )}
          renderRight={(query, resetVersion) => (
            <DebouncedSearchExample query={query} resetVersion={resetVersion} />
          )}
        />
      ) : (
        <div className="debounced-search-demo__code-view">
          <div className="debounced-search-demo__code-panel">
            <h4 className="debounced-search-demo__code-title">
              Naive implementation
            </h4>
            <pre className="debounced-search-demo__code-block">
              <code>{codeSamples.naive}</code>
            </pre>
          </div>

          <div className="debounced-search-demo__code-panel">
            <h4 className="debounced-search-demo__code-title">
              Debounced implementation
            </h4>
            <pre className="debounced-search-demo__code-block">
              <code>{codeSamples.debounced}</code>
            </pre>
          </div>
        </div>
      )}
    </section>
  )
}
