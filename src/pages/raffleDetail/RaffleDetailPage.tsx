// pages/raffleDetail/RaffleDetail.tsx
//import React, { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
//import { useUser } from '../../components/RaffleDetail/context/userContext';
import styled from 'styled-components';
import BigTitle from '../../components/BigTitle';
import Item from './components/Item';
import { raffleData } from '../../mocks/RaffleData';

const RaffleDetailPage = () => {
  return (
    <Wrapper>
      <Item {...raffleData[0]} />
    </Wrapper>
  );
};

export default RaffleDetailPage;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 63px;
`;

const RaffleDetailBox = styled.div``;

const ImageBox = styled.div`
  width: 390.582px;
  height: 390.582px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #f5f5f5;
`;
