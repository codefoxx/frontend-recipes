import { RouterProvider } from 'react-router-dom'

import { router } from '@/router/router'

/**
 * Root component for the React application.
 */
export default function App() {
  return <RouterProvider router={router} />
}
