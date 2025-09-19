import Home from '../pages/Home.jsx'
import Pricing from '../pages/Pricing.jsx'
import Solutions from '../pages/Solutions.jsx'
import CaseStudies from '../pages/CaseStudies.jsx'

const routes = [
  { path: '/', element: <Home /> },
  { path: '/solutions', element: <Solutions /> },
  { path: '/pricing', element: <Pricing /> },
  { path: '/cases', element: <CaseStudies /> },
]

export default routes
