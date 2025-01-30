import React from 'react';
import styled from 'styled-components';
import BigTitle from '../../../components/BigTitle';
import { raffleData } from '../../../mocks/RaffleData';
import icTicket from '../../../assets/raffleDetail/icon-ticket.svg';
import icLike from '../../../assets/raffleDetail/icon-like.svg';

interface ItemProps {
  id: number;
  image: string;
  name: string;
  ticket: number;
  category: string;
  openTime: string;
  closeTime: string;
  description: string;
}

const Item = ({
  image,
  name,
  ticket,
  category,
  openTime,
  closeTime,
  description,
}: ItemProps) => {
  return (
    <Wrapper>
      <BigTitle>{name}</BigTitle>
      <TopLayout>
        <ImageContainer src={image} alt={name} />
        <DetailLayout>
          <ItemTitleBox>{name}</ItemTitleBox>
          <ItemLookingBox>조회 16 · 찜 7</ItemLookingBox>
          <TicketBox>
            <img src={icTicket} alt="ticket" />
            {ticket}
          </TicketBox>
          <DetailContainer>
            <TitleSpan>카테고리</TitleSpan>
            <DescriptionBox>{category}</DescriptionBox>
          </DetailContainer>
          <DetailContainer>
            <TitleSpan>응모오픈</TitleSpan>
            <DescriptionBox>{openTime}</DescriptionBox>
          </DetailContainer>
          <DetailContainer>
            <TitleSpan>응모마감</TitleSpan>
            <DescriptionBox>{closeTime}</DescriptionBox>
          </DetailContainer>
          <ButtonContainer>
            <DoButton>응모하기</DoButton>
            <LikeBox>
              <img src={icLike} alt="like" /> 찜하기
            </LikeBox>
          </ButtonContainer>
          <WarningBox>
            판매자 희망 최소 참여자 이상 모이지 않으면 당첨자 없이 취소될 수
            있습니다. 취소된 래플에 대한 티켓은 다시 적립됩니다.
          </WarningBox>
        </DetailLayout>
      </TopLayout>
    </Wrapper>
  );
};

export default Item;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TopLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 50px 109px 30px 67px; //최상위 wrapper 기준으으로 다시 설정해야 하나?
  box-sizing: border-box;
  gap: 99.42px;
`;

const ImageContainer = styled.img.attrs((props) => ({
  src: props.src || '', // 기본 이미지가 없으면 빈 값
}))`
  width: 390.582px;
  height: 390.582px;
  border-radius: 5px;
  background: #f5f5f5;
`;

const DetailLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ItemTitleBox = styled.p`
  display: flex;
  width: 209px;
  height: 29px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  color: #000;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 33px */
`;
const ItemLookingBox = styled.div`
  display: flex;
  width: 103px;
  height: 18px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  color: #8f8e94;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
`;
const TicketBox = styled.div`
  display: flex;
  gap: 8.31px;
  padding-top: 40px;
  padding-bottom: 38.98px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 30px */
`;
const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  padding-bottom: 26px;
`;
const TitleSpan = styled.div`
  display: inline-block;
  min-width: 64px;

  color: #8f8e94;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
`;
const DescriptionBox = styled.div`
  display: flex;
  width: 269px;
  height: 19px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 35px;
  padding-bottom: 19px;
`;

const DoButton = styled.button`
  width: 344px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 7px;
  background: #c908ff;

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px; /* 90% */
  letter-spacing: -0.165px;

  cursor: pointer;
`;

const LikeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 45px;

  color: #8f8e94;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */

  img {
    width: 28px;
    height: 29px;
  }

  cursor: pointer;
`;

const WarningBox = styled.p`
  width: 343px;
  height: 54px;
  flex-shrink: 0;
  margin: 0;

  color: #8f8e94;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
`;
