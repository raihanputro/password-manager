import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home/index.jsx'
import Detail from './pages/Detail/index.jsx'
import Category from './pages/Category/index.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/:nameCategory",
    element: <Category />
  },
  {
    path: "/detail/:id",
    element: <Detail />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
