import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import ChargePage from '../pages/charge/chargePage';
import ModalProvider from '../components/Modal/context/ModalProvider';
import RaffleDetailPage from '../pages/raffleDetail/RaffleDetailPage';
import KakaoRedirect from '../pages/redirect/KakaoRedirect';
import RaffleUploadPage from '../pages/raffleUpload/RaffleUploadPage';
import WriteReview from '../pages/writeReview/writeReview';
import AddressSetPage from '../pages/address/addressSetPage';
import HomePage from '../pages/homepage/homePage';
import SetOpenInfoPage from '../pages/setOpenInfo/setOpenInfoPage';
import RaffleListPage from '../pages/RaffleListPage';
import ResultPage from '../pages/hostResult/ResultPage';

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
        path: '',
        element: (
          <div>
            <HomePage />
            <ModalProvider />
          </div>
        ),
      },
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
      { path: 'homepage', element: <HomePage /> },
      {
        path: 'raffle-detail',
        element: (
          <div>
            <RaffleDetailPage />
            <ModalProvider />
          </div>
        ),
      },
      {
        path: 'kakao',
        element: (
          <div>
            <KakaoRedirect />
            <ModalProvider />
          </div>
        ),
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
      {
        path: '/raffles/:type',
        element: <RaffleListPage />,
      },
      {
        path: 'result',
        element: (
          <div>
            <ResultPage />
            <ModalProvider />
          </div>
        ),
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
