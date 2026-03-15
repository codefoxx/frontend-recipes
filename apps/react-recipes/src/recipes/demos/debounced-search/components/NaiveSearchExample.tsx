import { useEffect, useReducer, useRef } from 'react'

import type { SearchItem } from '../services/mockSearchApi'
import { searchTopics } from '../services/mockSearchApi'
import {
  createCompletedLogEntry,
  createStartedLogEntry,
  type RequestLogEntry,
} from '../services/requestLog'

/**
 * Demonstrates the naive search behavior.
 *
 * Why this component exists:
 * - It provides the "before" state for the recipe.
 * - It reacts directly to the raw input value.
 *
 * What that means:
 * - every meaningful keystroke can trigger a request
 * - request volume rises quickly while typing
 * - the UI becomes noisier than necessary
 *
 * This implementation is intentionally straightforward because the recipe
 * needs a clear baseline before introducing the improved solution.
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
}

type Action =
  | { type: 'reset' }
  | { type: 'requestStarted'; entry: RequestLogEntry }
  | { type: 'requestCompleted'; entry: RequestLogEntry; results: SearchItem[] }

const initialState: State = {
  results: [],
  isLoading: false,
  requestCount: 0,
  logEntries: [],
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'reset':
      return initialState

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

export default function NaiveSearchExample({ query, resetVersion }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  /**
   * Tracks the logical request id across renders.
   *
   * This is internal sequencing state and should not trigger re-renders.
   */
  const requestSequence = useRef(0)

  useEffect(() => {
    dispatch({ type: 'reset' })
    requestSequence.current = 0
  }, [resetVersion])

  useEffect(() => {
    /**
     * Empty queries should not trigger requests.
     *
     * The reset is handled explicitly through resetVersion so the effect can
     * stay focused on request orchestration.
     */
    if (!query.trim()) {
      return
    }

    const requestId = ++requestSequence.current
    const startedEntry = createStartedLogEntry(requestId, query)

    dispatch({ type: 'requestStarted', entry: startedEntry })

    /**
     * The naive behavior comes from one direct coupling:
     * the request is executed from the raw input value.
     *
     * That means every meaningful change can immediately trigger a request.
     */
    void searchTopics(query).then((response) => {
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
  }, [query])

  return (
    <section className="search-example">
      <header className="search-example__header">
        <div className="search-example__stats">
          <span className="search-example__stat">
            Requests sent: <strong>{state.requestCount}</strong>
          </span>
          <span className="search-example__stat">
            Status: <strong>{state.isLoading ? 'Loading...' : 'Idle'}</strong>
          </span>
          <span className="search-example__stat">
            Query: <strong>{query || '—'}</strong>
          </span>
        </div>
      </header>

      <div className="search-example__body">
        <div className="search-example__panel search-example__panel--result">
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
