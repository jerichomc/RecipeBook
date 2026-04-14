import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './pages/App.jsx';
import Recipes from './pages/Recipes.jsx';
import Groceries from './pages/Groceries.jsx';
import NotFound from './pages/NotFound.jsx';

import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {path: "/", element: <App />},
  {path: "/recipes", element: <Recipes />},
  {path: "/groceries", element: <Groceries />},
  {path: "*", element: <NotFound />},
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
