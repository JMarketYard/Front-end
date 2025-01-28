import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from '../layout/RootLayout';
import RaffleUploadPage from '../pages/RaffleUploadPage';

const router = createBrowserRouter([
  {
    path: '/',

    element: <RootLayout />,
    children: [
      {
        path: 'raffle-upload',
        element: <RaffleUploadPage />
      }
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
