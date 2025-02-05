import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import moreList from '../../../assets/homePage/moreList.svg';
import SmallProductCard from '../../../components/SmallProductCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Product {
  raffleId: number;
  imageUrl: string;
  name: string;
  ticketNum: number;
  timeUntilEnd: number;
  finish: boolean;
  participantNum: number;
  like: boolean;
}

interface HomeSectionProps {
  title: string;
  icon: string;
  moreText: string;
  apiKey: 'approaching' | 'myLikeRaffles' | 'myFollowRaffles';
  moreLink: string;
  products: Product[];
}

const HomeSection: React.FC<HomeSectionProps> = ({
  title,
  icon,
  moreText,
  apiKey,
  moreLink,
  products,
}) => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <HeaderContainer>
        <TextBox>
          <img src={icon} alt="icon" /> {title}
        </TextBox>
        <MoreListBox onClick={() => navigate(moreLink)}>
          {moreText}
          <img src={moreList} alt="moreList" />
        </MoreListBox>
      </HeaderContainer>

      <ProductContainer>
        {products.map((product) => (
          <SmallProductCard key={product.raffleId} {...product} />
        ))}
      </ProductContainer>
    </Wrapper>
  );
};

export default HomeSection;

const Wrapper = styled.div`
  width: 100%;
  height: 306px;
  margin-bottom: 65px;
`;

const HeaderContainer = styled.div`
  display: flex;
  height: 38px;
  margin-bottom: 11px;
  justify-content: space-between;
  align-items: center;
`;

const TextBox = styled.div`
  display: flex;
  gap: 23px;
  color: #000;
  font-family: Inter;
  font-size: 22px;
  font-weight: 600;
`;

const MoreListBox = styled.a`
  width: 240px;
  height: 34px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #8f8e94;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;

  img {
    width: 10px;
    height: 17px;
    margin-left: 35px;
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  gap: 30px;
  width: 100%;
  max-width: 1080px;
`;
