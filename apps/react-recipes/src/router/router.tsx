import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../app/layout/MainLayout'
import HomePage from '../pages/HomePage'
import DebouncedSearchPage from '../recipes/debounced-search/DebouncedSearchPage'
import ProtectedRoutePage from '../recipes/protected-route/ProtectedRoutePage'
import PermissionUiPage from '../recipes/permission-ui/PermissionUiPage'

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
