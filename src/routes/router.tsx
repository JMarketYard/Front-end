import React from 'react';
import Login from '../pages/login/login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ModalProvider from '../components/Modal/context/ModalProvider';

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
