import type { RecipeDefinition } from '@shared/types'

/**
 * Fully implemented recipe used as the reference implementation in both apps.
 */
export const debouncedSearchRecipe: RecipeDefinition = {
  slug: 'debounced-search',
  title: 'Debounced Search',
  summary:
    'How to avoid wasteful requests, reduce UI noise, and keep search interactions responsive while users type.',
  category: 'Forms & Input',
  status: 'complete',
  demoKey: 'debounced-search',
  sections: [
    {
      id: 'problem',
      title: 'The Problem',
      kind: 'problem',
      content: `
A naive search experience often sends a new request on **every keystroke**.

That may seem harmless at first, but real users do not type one carefully spaced character at a time. They type in bursts, correct themselves, pause briefly, and continue. If the UI reacts to every single input event, the application ends up doing far more work than the user actually needs.

This creates several problems:

- unnecessary network traffic
- increased backend load
- noisy loading states and UI flicker
- more opportunities for stale or out-of-order results

The result is a search interaction that feels busy, expensive, and less stable than it should.
      `.trim(),
    },
    {
      id: 'baseline',
      title: 'Baseline',
      kind: 'baseline',
      content: `
The most straightforward implementation binds the input value directly to a fetch call. Each change in the text field immediately triggers a new search request.

That approach is easy to understand and easy to build, which is exactly why it appears so often in early implementations.

A simplified flow looks like this:

- user types a character
- component state updates
- request is sent immediately
- results are rendered when the response arrives

This baseline is useful because it makes the problem visible very quickly. It also highlights an important engineering lesson: a solution can be technically correct while still being a poor fit for real user behavior.
      `.trim(),
    },
    {
      id: 'pitfalls',
      title: 'Why this becomes problematic',
      kind: 'pitfall',
      content: `
The core issue is not just "too many requests". The bigger problem is that the UI becomes coupled to the raw speed of user input.

In practice, that creates a few different failure modes:

- **Excess work:** the application sends requests for intermediate values the user never cared about
- **Visual instability:** repeated loading indicators and result changes make the interface feel jumpy
- **Race conditions:** slower responses for older queries may arrive after newer ones and briefly overwrite the correct result
- **Poor scalability:** what feels acceptable against mock data becomes expensive once real APIs, latency, logging, caching, and rate limits are involved

This is why debouncing matters. It is not only a performance optimization. It is also a way to make the UI better reflect user intent.
      `.trim(),
    },
    {
      id: 'improvement',
      title: 'Improved Implementation',
      kind: 'improvement',
      content: `
A debounced search waits for a short pause in typing before sending the request.

Instead of treating every keystroke as a final decision, the UI waits until the user has likely finished the current input burst. In many cases, a delay around **250-400ms** already removes most unnecessary requests while still feeling responsive.

A stronger implementation usually combines several ideas:

- debounce the raw search term before triggering the request
- ignore or cancel stale requests where possible
- keep loading feedback clear but not noisy
- separate input state from query execution state

This produces a search experience that feels calmer, more intentional, and more robust under real-world conditions.
      `.trim(),
    },
    {
      id: 'solution',
      title: 'What the solution should achieve',
      kind: 'solution',
      content: `
A good debounced search implementation should do more than "wait a bit before fetching".

It should aim for these qualities:

- **Responsiveness:** the input should stay immediate and pleasant to type into
- **Efficiency:** requests should reflect meaningful user intent rather than every intermediate state
- **Correctness:** older responses should not overwrite newer results
- **Clarity:** loading and empty states should remain understandable
- **Maintainability:** debounce logic should be isolated enough to be reused and tested independently

In a production codebase, I would usually move the timing behavior into a dedicated hook so the component stays focused on rendering and state transitions.
      `.trim(),
    },
    {
      id: 'demo',
      title: 'Live Demo',
      kind: 'demo',
      content: `
The demo below contrasts a naive search with a debounced implementation.

The goal is to make the difference visible, not just theoretical:

- how many requests are triggered
- how often loading states appear
- how stable the result list feels while typing

That comparison makes it easier to see why debouncing is not a micro-optimization, but a practical improvement to both UX and system behavior.
      `.trim(),
    },
    {
      id: 'takeaway',
      title: 'Takeaway',
      kind: 'takeaway',
      content: `
Debouncing is a small technique with outsized impact.

It improves perceived quality for the user, reduces unnecessary work for the system, and forces a healthier separation between immediate input events and deliberate query execution.

That makes it a good example of frontend engineering beyond just rendering components: understanding user behavior, async boundaries, and how small implementation details shape the overall experience.
      `.trim(),
    },
  ],
}
