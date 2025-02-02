import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from '../layout/RootLayout';
import ChargePage from '../pages/charge/chargePage';
import ModalProvider from '../components/Modal/context/ModalProvider';
import KakaoRedirect from '../pages/redirect/KakaoRedirect';
import RaffleUploadPage from '../pages/raffleUpload/RaffleUploadPage';
import WriteReview from '../pages/writeReview/writeReview';
import AddressSetPage from '../pages/address/addressSetPage';
import SetOpenInfoPage from '../pages/setOpenInfo/setOpenInfoPage';

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
      {
        path: 'review',
        element: <WriteReview />,
      },
      {
        path: 'address',
        element: (
          <>
            <AddressSetPage />
            <ModalProvider />
          </>
        ),
      },
      {
        path: 'set-open',
        element: <SetOpenInfoPage />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
