import React from 'react';
import styled from 'styled-components';
import clock from '../assets/clock.png';
import DeadlineProductCard from '../../../components/deadlineProductCard';

const ImminentDeadline = () => {
  return (
    <DeadlineWrapper>
      <DeadlineContainer>
        <img src={clock} alt="clock" /> <TextBox>마감임박</TextBox>
      </DeadlineContainer>

      <ProductRow>
        <DeadlineProductCard />
        <DeadlineProductCard />
        <DeadlineProductCard />
        <DeadlineProductCard />
        <DeadlineProductCard />
      </ProductRow>
    </DeadlineWrapper>
  );
};

const DeadlineWrapper = styled.div`
  width: 1443px;
  height: 472px;
  margin: 138px 0 138px 0;
`;

const DeadlineContainer = styled.div`
  height: 52px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 9px 0px 47px 14px;
  align-items: center;
`;

const TextBox = styled.p`
  font-size: 40px;
  color: #000000;
  font-weight: 600;
  margin-left: 45px;
`;

const ProductRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
export default ImminentDeadline;
