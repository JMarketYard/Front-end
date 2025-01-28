import styled from 'styled-components';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
};

export default RootLayout;

const Wrapper = styled.div`
  min-width: 1440px;
  display: flex;
<<<<<<< HEAD
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
=======
  justify-content: center;
  flex-direction: column;
>>>>>>> develop
`;
