import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router/Router.jsx'
import './styles/variables.css'
import './styles/globals.css'
import './styles/glass.css'
import SmoothScroll from './components/SmoothScroll.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SmoothScroll duration={2.2} lerp={0.065} />
    <RouterProvider router={router} />
  </React.StrictMode>
)
