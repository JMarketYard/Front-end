import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',

    element: <></>,
    children: [],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
