import React, { useState } from 'react';
import styled from 'styled-components';
import ticket from '../assets/ProductCard/ticket.svg';
import like from '../assets/ProductCard/like.svg';

const ProductCard = () => {
  return (
    <Wrapper>
      <ImageContainer>
        {/* <TextBox>마감임박</TextBox> //추후 마감임박 표시 추가되는지 확인*/}
        <LikeBox>
          <img src={like} alt="like" />
        </LikeBox>
      </ImageContainer>
      <InfoContainer>
        <TitleContainer>
          <TitleBox>다영언니의 텀블러</TitleBox>
          <ParticipantsBox>5명 응모중</ParticipantsBox>
        </TitleContainer>

        <ContentContainer>
          <TicketBox>
            <img src={ticket} alt="ticket" /> 3
          </TicketBox>
          <TimeBox>7시간 35분 27초뒤 마감</TimeBox>
        </ContentContainer>
      </InfoContainer>
    </Wrapper>
  );
};

export default ProductCard;

const Wrapper = styled.div`
  width: 228px;
  height: 314px;
  flex-shrink: 0;
  border-radius: 2px;
  background: #fff;
`;

const ImageContainer = styled.div`
  width: 228px;
  height: 227px;
  flex-shrink: 0;
  border-radius: 5px;
  background: #e4e4e4;
  position: relative;
  margin-top: 6px;
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
  width: 26px;
  height: 26px;
  flex-shrink: 0;

  position: absolute;
  top: 188px;
  right: 16px;

  /* cursor: pointer;
  user-select: none; */
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 0px 5.6px 16px 5px;
`;

const TitleContainer = styled.div`
  display: flex;
  height: 21px;
  margin-top: 14px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;

  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 112.5% */
`;

const ParticipantsBox = styled.div`
  display: flex;
  align-items: center;

  color: #c908ff;
  text-align: right;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 150% */
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TicketBox = styled.div`
  display: flex;
  gap: 11px;

  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
`;

const TimeBox = styled.div`
  color: #8f8e94;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 18.2px */
`;
