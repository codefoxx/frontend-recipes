import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '@/app/layout/MainLayout'
import HomePage from '@/pages/HomePage'
import RecipePage from '@/pages/RecipePage'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/recipes/:slug',
        element: <RecipePage />,
      },
    ],
  },
])
