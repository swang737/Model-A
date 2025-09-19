import { createBrowserRouter } from 'react-router-dom'
import routes from './routes.jsx'
import App from '../App.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: routes
  }
])

export default router
