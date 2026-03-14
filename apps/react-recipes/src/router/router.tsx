import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '@/app/layout/MainLayout'
import HomePage from '@/pages/HomePage'
import DebouncedSearchPage from '@/recipes/debounced-search/pages/DebouncedSearchPage'
import PermissionUiPage from '@/recipes/permission-ui/PermissionUiPage'
import ProtectedRoutePage from '@/recipes/protected-route/ProtectedRoutePage'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/recipes/debounced-search',
        element: <DebouncedSearchPage />,
      },
      {
        path: '/recipes/protected-route',
        element: <ProtectedRoutePage />,
      },
      {
        path: '/recipes/permission-ui',
        element: <PermissionUiPage />,
      },
    ],
  },
])
