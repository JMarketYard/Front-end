import React from 'react';
import styled from 'styled-components';
import follow from '../../../assets/homePage/follow.svg';
import moreList from '../../../assets/homePage/moreList.svg';
import SmallProductCard from '../../../components/SmallProductCard';
import { useNavigate } from 'react-router-dom';

const MyFollow = () => {
  const navigate = useNavigate();
  const products: null[] = Array(5).fill(null);
  return (
    <Wrapper>
      <HeaderContainer>
        <TextBox>
          <img src={follow} alt="follow" /> 팔로우한 상점의 래플
        </TextBox>
        <MoreListBox onClick={() => navigate('/')}>
          팔로우한 상점 래플 더보기
          <img src={moreList} alt="moreList" />
        </MoreListBox>
      </HeaderContainer>

      <ProductGrid>
        {products.map((_, index) => (
          <SmallProductCard key={index} />
        ))}
      </ProductGrid>
    </Wrapper>
  );
};

export default MyFollow;

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

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  width: 100%;
  max-width: 1080px;
`;
