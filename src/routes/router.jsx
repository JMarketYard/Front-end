import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>홈 페이지</h1>,
    children: [],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
