import { useEffect, useReducer, useRef } from 'react'

import { useDebouncedValue } from '../hooks/useDebouncedValue'
import type { SearchItem } from '../services/mockSearchApi'
import { searchTopics } from '../services/mockSearchApi'
import {
  createCompletedLogEntry,
  createStartedLogEntry,
  type RequestLogEntry,
} from '../services/requestLog'

/**
 * Demonstrates the improved search behavior using a debounced query value.
 *
 * Why this component exists:
 * - It provides the "after" state for the recipe.
 * - It keeps typing responsive while reducing unnecessary requests.
 *
 * Important distinction:
 * - the raw input still changes immediately
 * - only the expensive side effect is delayed
 *
 * That separation is the key idea behind debounced search.
 */
interface Props {
  query: string
  resetVersion: number
}

interface State {
  results: SearchItem[]
  isLoading: boolean
  requestCount: number
  logEntries: RequestLogEntry[]
  inputChangeCount: number
}

type Action =
  | { type: 'reset' }
  | { type: 'inputChanged' }
  | { type: 'requestStarted'; entry: RequestLogEntry }
  | { type: 'requestCompleted'; entry: RequestLogEntry; results: SearchItem[] }

const initialState: State = {
  results: [],
  isLoading: false,
  requestCount: 0,
  logEntries: [],
  inputChangeCount: 0,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'reset':
      return initialState

    case 'inputChanged':
      return {
        ...state,
        inputChangeCount: state.inputChangeCount + 1,
      }

    case 'requestStarted':
      return {
        ...state,
        isLoading: true,
        requestCount: state.requestCount + 1,
        logEntries: [action.entry, ...state.logEntries],
      }

    case 'requestCompleted':
      return {
        ...state,
        isLoading: false,
        results: action.results,
        logEntries: [action.entry, ...state.logEntries],
      }
  }
}

export default function DebouncedSearchExample({ query, resetVersion }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  /**
   * The raw input reflects the user's typing immediately.
   * The debounced query only updates after a short pause.
   */
  const debouncedQuery = useDebouncedValue(query, 300)

  /**
   * Tracks the logical request id across renders.
   *
   * This is internal sequencing state and should not trigger re-renders.
   */
  const requestSequence = useRef(0)

  /**
   * Tracks the previous raw query value so we only count real changes.
   */
  const previousQuery = useRef('')

  useEffect(() => {
    dispatch({ type: 'reset' })
    requestSequence.current = 0
    previousQuery.current = ''
  }, [resetVersion])

  useEffect(() => {
    /**
     * Count meaningful raw input changes.
     *
     * This approximates how often a naive implementation would have had the
     * opportunity to trigger a request directly from the live input.
     */
    if (!query.trim()) {
      previousQuery.current = query
      return
    }

    if (query !== previousQuery.current) {
      dispatch({ type: 'inputChanged' })
      previousQuery.current = query
    }
  }, [query])

  useEffect(() => {
    /**
     * Empty debounced values should not trigger requests.
     *
     * This covers both the initial render and the case where the user clears
     * the input and then pauses.
     */
    if (!debouncedQuery.trim()) {
      return
    }

    const requestId = ++requestSequence.current
    const startedEntry = createStartedLogEntry(requestId, debouncedQuery)

    dispatch({ type: 'requestStarted', entry: startedEntry })

    /**
     * The improved behavior comes from one simple change:
     * we execute the request from the debounced query instead of the raw input.
     */
    void searchTopics(debouncedQuery).then((response) => {
      const completedEntry = createCompletedLogEntry(
        requestId,
        response.query,
        response.durationMs,
      )

      dispatch({
        type: 'requestCompleted',
        entry: completedEntry,
        results: response.results,
      })
    })
  }, [debouncedQuery])

  const requestsAvoided = Math.max(
    0,
    state.inputChangeCount - state.requestCount,
  )

  return (
    <section className="search-example">
      <header className="search-example__header">
        <div className="search-example__stats">
          <span className="search-example__stat">
            Requests sent: <strong>{state.requestCount}</strong>
          </span>
          <span className="search-example__stat">
            Requests avoided: <strong>{requestsAvoided}</strong>
          </span>
          <span className="search-example__stat">
            Status: <strong>{state.isLoading ? 'Loading...' : 'Idle'}</strong>
          </span>
          <span className="search-example__stat">
            Live query: <strong>{query || '—'}</strong>
          </span>
          <span className="search-example__stat">
            Debounced query: <strong>{debouncedQuery || '—'}</strong>
          </span>
        </div>
      </header>

      <div className="search-example__body">
        <div className="search-example__panel search-example__panel--results">
          <h4 className="search-example__panel-title">Results</h4>

          {!query.trim() ? (
            <p className="search-example__empty">
              Start typing above to trigger requests.
            </p>
          ) : state.results.length === 0 && !state.isLoading ? (
            <p className="search-example__empty">No results found.</p>
          ) : (
            <ul className="search-example__results">
              {state.results.map((item) => (
                <li key={item.id} className="search-example__result-item">
                  <span className="search-example__result-label">
                    {item.label}
                  </span>
                  <span className="search-example__result-category">
                    {item.category}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="search-example__panel search-example__panel--console">
          <h4 className="search-example__panel-title">Request console</h4>

          {state.logEntries.length === 0 ? (
            <p className="search-example__empty">
              No requests have been fired yet.
            </p>
          ) : (
            <ol className="search-example__log">
              {state.logEntries.map((entry) => (
                <li
                  key={entry.id}
                  className={`search-example__log-entry search-example__log-entry--${entry.type}`}
                >
                  {entry.message}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  )
}
