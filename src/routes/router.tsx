import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import ChargePage from '../pages/charge/chargePage';
import ModalProvider from '../components/Modal/context/ModalProvider';
import RaffleUploadPage from '../pages/RaffleUploadPage';
import SetOpenInfoPage from '../pages/setOpenInfo/setOpenInfoPage';
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
        path: 'set-open',
        element: <SetOpenInfoPage />,
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
