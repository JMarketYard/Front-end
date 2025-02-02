import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from '../layout/RootLayout';
import ChargePage from '../pages/charge/chargePage';
import ModalProvider from '../components/Modal/context/ModalProvider';
import RaffleUploadPage from '../pages/RaffleUploadPage';
import KakaoRedirect from '../pages/redirect/KakaoRedirect';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <RootLayout />
        <ModalProvider />
      </div>
    ),
    children: [
      {
        path: 'change',
        element: (
          <div>
            <ChargePage />
            <ModalProvider />
          </div>
        ),
      },
      {
        path: 'raffle-upload',
        element: <RaffleUploadPage />,
      },
      {
        path: 'kakao',
        element: <KakaoRedirect />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
