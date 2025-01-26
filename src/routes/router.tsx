import React from 'react';
import Login from '../pages/login/login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from '../layout/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',

    element: <RootLayout />,
    children: [],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
