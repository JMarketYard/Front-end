import React from 'react';
import styled from 'styled-components';
import BigTitle from '../../../components/BigTitle';
import { raffleData } from '../../../mocks/RaffleData';

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
          <ItemLookingBox>조회, 찜</ItemLookingBox>
          <TicketBox>{ticket}</TicketBox>
          <DetailContainer>
            <DetailBox>카테고리</DetailBox>
            <DescriptionBox>{category}</DescriptionBox>
          </DetailContainer>
          <DetailContainer>
            <DetailBox>응모오픈</DetailBox>
            <DescriptionBox>{openTime}</DescriptionBox>
          </DetailContainer>
          <DetailContainer>
            <DetailBox>응모마감</DetailBox>
            <DescriptionBox>{closeTime}</DescriptionBox>
          </DetailContainer>
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
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 50px 294px 30px 247px;
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
  margin-bottom: 26px;
`;
const DetailBox = styled.div`
  display: flex;
  width: 64px;
  height: 19px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

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
