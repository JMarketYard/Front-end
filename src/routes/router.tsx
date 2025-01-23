import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RaffleUploadPage from '../pages/RaffleUploadPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RaffleUploadPage />,
    children: [],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
