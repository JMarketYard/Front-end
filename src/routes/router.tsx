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
import RaffleListPage from '../pages/raffleList/RaffleListPage';
import ResultPage from '../pages/hostResult/ResultPage';
import SearchResultPage from '../pages/raffleList/SearchResultPage';
import CategoryResultPage from '../pages/raffleList/CategoryResultPage';
import MyProfilePage from '../pages/mypage/mypage';
import FollowingList from '../pages/mypage/FollowingList';
import PublicInformationSet from '../pages/mypage/PublicInformationSet';
import Setting from '../pages/mypage/Setting';
import ReviewPage from '../components/ReviewPage';
import ScrollToTop from '../components/ScrollTop';
import AskPage from '../pages/ask/askPage';
import WinnerPage from '../pages/winner/winnerPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <ScrollToTop />
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
      {
        path: 'raffles/:type', //래플 상세보기
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
        path: '/raffles/list/:type', //더보기
        element: <RaffleListPage />,
      },
      {
        path: '/search/:type', //검색결과 조회
        element: <SearchResultPage />,
      },
      {
        path: '/categories/:type',
        element: <CategoryResultPage />,
      },
      {
        path: 'host-result',
        element: (
          <div>
            <ResultPage />
            <ModalProvider />
          </div>
        ),
      },
      {
        path: 'mypage/following-list',
        element: <FollowingList />,
      },
      {
        path: 'mypage/setting',
        element: <Setting />,
      },
      {
        path: 'mypage',
        element: <MyProfilePage />,
      },
      {
        path: 'mypage/public-information-set',
        element: <PublicInformationSet />,
      },
      {
        path: 'mypage/my-review',
        element: <ReviewPage />,
      },
      {
        path: 'ask',
        element: <AskPage />,
      },
      { path: 'winner-page', element: <WinnerPage /> },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
