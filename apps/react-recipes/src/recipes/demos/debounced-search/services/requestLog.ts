/**
 * Request log model used by the debounced search demo.
 *
 * Why this file exists:
 * - The on-screen console is one of the main teaching tools in this recipe.
 * - It makes asynchronous request behavior visible instead of leaving it
 *   implicit in loading states and result changes.
 *
 * Design goals:
 * - Keep the model small and easy to render in React.
 * - Represent the request lifecycle clearly.
 * - Generate readable messages without mixing formatting logic into components.
 */

export type RequestEventType = 'started' | 'completed' | 'ignored'

export interface RequestLogEntry {
  /**
   * Stable identifier for the log entry itself.
   *
   * This is useful as a React key because multiple events can belong
   * to the same request id.
   */
  id: string

  /**
   * Logical request identifier assigned by the caller.
   *
   * Example:
   * - request 3 started
   * - request 3 completed
   */
  requestId: number

  /**
   * Lifecycle phase of the request.
   */
  type: RequestEventType

  /**
   * Query value associated with the request.
   */
  query: string

  /**
   * Duration in milliseconds, if known.
   *
   * This is usually present for completed requests.
   */
  durationMs?: number

  /**
   * Timestamp captured when the event was created.
   *
   * Stored as a number so formatting remains the responsibility
   * of the UI layer.
   */
  timestamp: number

  /**
   * Readable message for the demo console.
   *
   * We generate this once so components can stay focused on behavior
   * instead of string formatting.
   */
  message: string
}

/**
 * Creates a log entry for a request that has just started.
 */
export function createStartedLogEntry(
  requestId: number,
  query: string,
): RequestLogEntry {
  return {
    id: crypto.randomUUID(),
    requestId,
    type: 'started',
    query,
    timestamp: Date.now(),
    message: `[${requestId}] search("${query}") started`,
  }
}

/**
 * Creates a log entry for a request that completed successfully.
 */
export function createCompletedLogEntry(
  requestId: number,
  query: string,
  durationMs: number,
): RequestLogEntry {
  return {
    id: crypto.randomUUID(),
    requestId,
    type: 'completed',
    query,
    durationMs,
    timestamp: Date.now(),
    message: `[${requestId}] search("${query}") completed in ${durationMs}ms`,
  }
}

/**
 * Creates a log entry for a response that was intentionally ignored.
 *
 * This becomes useful when we demonstrate how a better implementation
 * protects the UI from stale responses.
 */
export function createIgnoredLogEntry(
  requestId: number,
  query: string,
): RequestLogEntry {
  return {
    id: crypto.randomUUID(),
    requestId,
    type: 'ignored',
    query,
    timestamp: Date.now(),
    message: `[${requestId}] search("${query}") ignored`,
  }
}
