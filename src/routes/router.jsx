import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../pages/homepage/homePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
