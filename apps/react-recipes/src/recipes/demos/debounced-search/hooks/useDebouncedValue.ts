import { useEffect, useState } from 'react'

/**
 * Returns a debounced version of the provided value.
 *
 * Why this hook exists:
 * - User input often changes much faster than the application should react.
 * - By delaying propagation, we can wait for a short pause in typing before
 *   triggering more expensive work such as API requests.
 *
 * Example:
 * - raw value changes on every keystroke
 * - debounced value only updates after the user pauses briefly
 *
 * This hook is intentionally generic so it can be reused beyond search inputs.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    /**
     * Each value change starts a new timer.
     *
     * If the value changes again before the delay expires, React will run the
     * cleanup function first and cancel the previous timer. That behavior is
     * what gives us the debounce effect.
     */
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delayMs)

    /**
     * Clear the pending timer when:
     * - the value changes again
     * - the delay changes
     * - the component unmounts
     *
     * Without this cleanup, outdated timers could still commit stale values.
     */
    return () => {
      clearTimeout(timeoutId)
    }
  }, [value, delayMs])

  return debouncedValue
}
