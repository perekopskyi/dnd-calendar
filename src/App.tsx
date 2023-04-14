import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Labels } from './modules/Labels'
import { Home } from './modules/Home'
import { LabelsProvider } from './modules/Labels/Context'

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

const App = () => (
  <LabelsProvider>
    <RouterProvider router={router} />
  </LabelsProvider>
) 

export default App
