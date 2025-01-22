import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from '../components/Header';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    children: [],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
