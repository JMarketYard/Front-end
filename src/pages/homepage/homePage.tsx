import React from 'react';
import styled from 'styled-components';
import AdBanner from './components/AdBanner';
import ImminentDeadline from './components/ImminentDeadline';
import MyLike from './components/MyLike';
import MyFollow from './components/MyFollow';
import moreList from '../../assets/homePage/moreList.svg';
import ProductCard from '../../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <AdBanner />
      <Wrapper>
        <ImminentDeadline />
        <MyLike />
        <MyFollow />
        <LookAroundContainer>
          <LookAroundBox>래플 둘러보기</LookAroundBox>
          <MoreListBox onClick={() => navigate('/')}>
            마감임박 상품 더보기
            <img src={moreList} alt="moreList" />
          </MoreListBox>
        </LookAroundContainer>

        <Horizon />

        <ProductRow>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ProductRow>
        <ProductRow>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ProductRow>
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

const LookAroundContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const LookAroundBox = styled.p`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const MoreListBox = styled.a`
  width: 250px;
  height: 34px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  display: flex;
  color: #8f8e94;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 36.832px; /* 230.199% */
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;

  img {
    width: 10px;
    height: 17px;
    margin-left: 35px;
  }

  cursor: pointer;
`;

const Horizon = styled.hr`
  width: 100%;
  border-top: 1px solid #8f8e94;
  margin-top: 42px;
  margin-bottom: 46px;
`;

const ProductRow = styled.div`
  width: 100%;
  margin-bottom: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default HomePage;
