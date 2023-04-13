import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Labels } from './modules/Labels'
import { Home } from './modules/Home'

export const ROUTES = {
  MAIN: '/',
  LABELS: '/labels'
}

const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <Home />,
  },
  {
    path: ROUTES.LABELS,
    element: <Labels />,
  },
])

const App = () => <RouterProvider router={router} />

export default App
