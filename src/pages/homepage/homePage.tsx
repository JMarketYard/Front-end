import React from 'react';
import styled from 'styled-components';
import NavBar from './components/navBar';
import AdBanner from './components/adBanner';
import ImminentDeadline from './components/imminentDeadline';
import MyLike from './components/myLike';
import MyFollow from './components/myFollow';
import ProductCard from '../../components/productCard';
import InfiniteScroll from './components/InfiniteScroll';

const HomePage = () => {
  return (
    <>
      <NavBar />

      <Wrapper>
        <ImminentDeadline />
        <MyLike />
        <MyFollow />
        <LookAroundBox>래플 둘러보기</LookAroundBox>
        <Horizon />

        <ProductRow>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ProductRow>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1080px;
  margin: 0 auto;
  align-items: center;
`;

const LookAroundBox = styled.p`
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const Horizon = styled.hr`
  width: 100%;
  border-top: 1px solid #000000;
  margin-top: 88px;
  margin-bottom: 108px;
`;

const ProductRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default HomePage;
