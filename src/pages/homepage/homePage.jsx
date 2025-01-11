import React from 'react';
import styled from 'styled-components';
import NavBar from './components/navBar';
import AdBanner from './components/adBanner';
import ImminentDeadline from './components/imminentDeadline';
import ProductCard from '../../components/productCard';
import InfiniteScroll from './components/InfiniteScroll';

const HomePage = () => {
  return (
    <>
      <NavBar />

      <Wrapper>
        <ImminentDeadline />
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
  max-width: 1443px;
  width: 100%;
  margin: 0 auto;
  align-items: center;
`;

const LookAroundBox = styled.p`
  margin-top: 138px;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
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
