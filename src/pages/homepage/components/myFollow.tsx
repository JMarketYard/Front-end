import React from 'react';
import styled from 'styled-components';
import clock from '../../../assets/homePage/clock.svg';
import moreList from '../../../assets/homePage/moreList.svg';
import SmallProductCard from '../../../components/smallProductCard';

const MyFollow = () => {
  return (
    <Wrapper>
      <DeadlineContainer>
        <TextBox>
          <img src={clock} alt="clock" /> 마감임박
        </TextBox>
        <MoreListBox>
          마감임박 상품 더보기
          <img src={moreList} alt="moreList" />
        </MoreListBox>
      </DeadlineContainer>

      <ProductContainer>
        <SmallProductCard />
        <SmallProductCard />
        <SmallProductCard />
        <SmallProductCard />
        <SmallProductCard />
      </ProductContainer>
    </Wrapper>
  );
};

export default MyFollow;

const Wrapper = styled.div`
  width: 100%;
  height: 306px;
  margin-bottom: 65px;
`;

const DeadlineContainer = styled.div`
  height: 52px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-botton: 11px;
  align-items: center;
`;

const TextBox = styled.p`
  gap: 23px;

  color: #000;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const MoreListBox = styled.div`
  width: 178px;
  height: 37px;
  justify-content: space-between;

  gap: 35px;
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
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
