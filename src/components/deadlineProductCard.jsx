import React, { useState } from 'react';
import styled from 'styled-components';
import smallTicket from '../pages/homepage/assets/smallTicket.png';
import smallLike from '../pages/homepage/assets/smallLike.png';
import smallUnlike from '../pages/homepage/assets/smallUnlike.png';

const DeadlineProductCard = () => {
  return (
    <CardWrapper>
      <CardLayout>
        <ImageContainer>
          <Box1>
            <TextBox>마감임박</TextBox>
          </Box1>
          <LikeBox>
            <img src={smallUnlike} alt="smallUnlike" />
          </LikeBox>
        </ImageContainer>

        <HeaderContainer>
          <TitleBox>다영언니의 텀블러</TitleBox>
        </HeaderContainer>
        <FooterContainer>
          <TicketBox>
            <img src={smallTicket} alt="smallTicket" /> 3
          </TicketBox>
          <TimeBox>7시간 35분 27초뒤 마감</TimeBox>
        </FooterContainer>
      </CardLayout>
    </CardWrapper>
  );
};

export default DeadlineProductCard;

const CardWrapper = styled.div`
  width: 275px;
  height: 364px;
  background-color: #ffffff;
`;

const CardLayout = styled.div`
  width: 250px;
  height: 332px;
  margin: 16px 13px 16px 12px;
`;

const ImageContainer = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 5px;
  background-color: #eaeaea;
  position: relative;
`;

const Box1 = styled.div`
  width: 94px;
  height: 31px;
  border-radius: 42px;
  position: absolute;
  top: 208px;
  right: 141px;
  background-color: rgba(201, 8, 255, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #c908ff;
`;

const LikeBox = styled.div`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 208px;
  right: 14px;

  cursor: pointer;
  user-select: none;
`;

const HeaderContainer = styled.div`
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 3px;
  margin-left: 1px;
`;

const TitleBox = styled.p`
  font-size: 22px;
  font-weight: normal;
  color: #000000;
`;

const FooterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TicketBox = styled.div`
  margin-top: 3px;
  margin-left: 1px;
  gap: 6px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
`;

const TimeBox = styled.time`
  font-size: 16px;
  color: #8f8e94;
`;
