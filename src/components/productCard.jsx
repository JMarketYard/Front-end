import React, { useState } from 'react';
import styled from 'styled-components';
import ticket from '../pages/homepage/assets/ticket.png';
import like from '../pages/homepage/assets/like.png';
import unlike from '../pages/homepage/assets/unlike.png';

const ProductCard = () => {
  return (
    <CardWrapper>
      <CardLayout>
        <ImageContainer>
          <LikeBox>
            <img src={like} alt="like" />
          </LikeBox>
        </ImageContainer>

        <HeaderContainer>
          <TitleBox>다영언니의 텀블러</TitleBox>
          <ParticipantsBox>5명 응모중</ParticipantsBox>
        </HeaderContainer>
        <FooterContainer>
          <TicketBox>
            <img src={ticket} alt="ticket" /> 3
          </TicketBox>
          <TimeBox>7시간 35분 27초뒤 마감</TimeBox>
        </FooterContainer>
      </CardLayout>
    </CardWrapper>
  );
};

export default ProductCard;

const CardWrapper = styled.div`
  width: 337px;
  height: 432px;
  background-color: #ffffff;
`;

const CardLayout = styled.div`
  width: 308px;
  height: 108px;
  margin: 16px 15px 15px 14px;
`;

const ImageContainer = styled.div`
  width: 308px;
  height: 308px;
  border-radius: 5px;
  background-color: #e4e4e4;
  position: relative;
`;

const LikeBox = styled.div`
  width: 39px;
  height: 39px;
  position: absolute;
  top: 255px;
  right: 15.74px;
  bottom: 13.74px;
  left: 253px;
  cursor: pointer;
  user-select: none;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const TitleBox = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #000000;
`;

const ParticipantsBox = styled.p`
  font-size: 18px;
  color: #c908ff;
  font-weight: 600;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TicketBox = styled.div`
  gap: 14px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
`;

const TimeBox = styled.time`
  font-size: 18px;
  color: #8f8e94;
`;
