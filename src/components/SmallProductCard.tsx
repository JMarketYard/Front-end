import React, { useState } from 'react';
import styled from 'styled-components';
import smallTicket from '../assets/smallProductCard/smallTicket.svg';
import smallUnlike from '../assets/smallProductCard/smallUnlike.svg';
import smallLike from '../assets/smallProductCard/smallLike.svg';

const SmallProductCard = () => {
  const [isLiked, setIsLiked] = useState(false);
  const toggleLike = () => {
    setIsLiked((prevState) => !prevState);
  };
  return (
    <Wrapper>
      <ImageContainer>
        <TextBox>마감임박</TextBox>
        <LikeBox onClick={toggleLike}>
          <img
            src={isLiked ? smallLike : smallUnlike}
            alt={isLiked ? 'Liked' : 'Unliked'}
          />
        </LikeBox>
      </ImageContainer>
      <Layout>
        <TitleContainer>다영언니의 텀블러</TitleContainer>
        <InfoContainer>
          <TicketBox>
            <img src={smallTicket} alt="smallTicket" /> 3
          </TicketBox>
          <TimeBox>7시간 35분 27초뒤 마감</TimeBox>
        </InfoContainer>
      </Layout>
    </Wrapper>
  );
};

export default SmallProductCard;

const Wrapper = styled.div`
  width: 192px;
  height: 261px;
  background-color: #ffffff;
`;

const ImageContainer = styled.div`
  width: 192px;
  height: 192px;
  flex-shrink: 0;
  border-radius: 3px;
  background-color: #eaeaea;
  position: relative;
  margin-top: 14px;
`;

const TextBox = styled.div`
  width: 71px;
  height: 23px;
  flex-shrink: 0;
  border-radius: 42px;
  background: rgba(201, 8, 255, 0.2);

  position: absolute;
  top: 162px;
  right: 114px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #c908ff;
  text-align: center;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 163.636% */
`;

const LikeBox = styled.div`
  width: 21px;
  height: 21px;
  flex-shrink: 0;

  position: absolute;
  top: 163px;
  right: 9px;

  cursor: pointer;
`;

const Layout = styled.div`
  padding: 0 9px 5px 7px;
`;

const TitleContainer = styled.div`
  display: inline-flex;
  height: 31px;
  padding: 5px 0px 4px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TicketBox = styled.div`
  display: flex;
  gap: 8.61px;

  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`;

const TimeBox = styled.div`
  color: #8f8e94;
  text-align: right;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
`;
