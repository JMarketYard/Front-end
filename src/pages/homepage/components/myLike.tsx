import React from 'react';
import styled from 'styled-components';
import like from '../../../assets/homePage/like.svg';
import moreList from '../../../assets/homePage/moreList.svg';
import SmallProductCard from '../../../components/smallProductCard';
import { useNavigate } from 'react-router-dom';

const Mylike = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <HeaderContainer>
        <TextBox>
          <img src={like} alt="like" /> 내가 찜한 래플
        </TextBox>
        <MoreListBox onClick={() => navigate('/')}>
          내가 찜한 래플 더보기
          <img src={moreList} alt="moreList" />
        </MoreListBox>
      </HeaderContainer>

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

const Wrapper = styled.div`
  width: 100%;
  height: 306px;
  margin-bottom: 65px;
`;

const HeaderContainer = styled.div`
  display: flex;
  height: 38px;
  margin-bottom: 11px;
  flex-direction: row;
  justify-content: space-between;
  flex-shrink: 0;

  align-items: center;
`;

const TextBox = styled.div`
  display: flex;
  gap: 23px;

  color: #000;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const MoreListBox = styled.a`
  width: 220px;
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

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export default Mylike;
