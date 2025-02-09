import React, { useState } from 'react';
import styled from 'styled-components';
import ticket from '../assets/ProductCard/ticket.svg';
import icLike from '../assets/ProductCard/like.svg';
import icUnlike from '../assets/ProductCard/unlike.svg';
import { Link } from 'react-router-dom';
import RaffleProps from './RaffleProps';

const getFormatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분 ${remainingSeconds}초`;
  }
  if (minutes > 0) {
    return `${minutes}분 ${remainingSeconds}초`;
  }
  return `${remainingSeconds}초`;
};

const ProductCard: React.FC<RaffleProps> = ({
  raffleId,
  imageUrls,
  name,
  ticketNum,
  timeUntilEnd,
  finish,
  participantNum,
  like,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const toggleLike = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation(); //Wrapper로 이벤트 전달 방지
    event.preventDefault(); // 기본 동작 (Link 이동) 방지
    setIsLiked((prevState) => !prevState);
  };

  return (
    <Wrapper>
      <StyledLink to={`/raffles/${raffleId}`}>
        <ImageContainer imageUrls={imageUrls}>
          {finish && <RaffleClosingBox>응모 마감</RaffleClosingBox>}
          {timeUntilEnd > 0 && timeUntilEnd <= 86400 && (
            <TextBox>마감임박</TextBox>
          )}
          <LikeBox onClick={toggleLike}>
            <img
              src={isLiked ? icLike : icUnlike}
              alt={isLiked ? 'Liked' : 'Unliked'}
            />
          </LikeBox>
        </ImageContainer>
        <InfoContainer>
          <TitleContainer>
            <TitleBox>{name}</TitleBox>
            <ParticipantsBox>{participantNum}명 응모중</ParticipantsBox>
          </TitleContainer>

          <ContentContainer>
            <TicketBox>
              <img src={ticket} alt="ticket" /> {ticketNum}
            </TicketBox>
            {!finish && <TimeBox>{getFormatTime(timeUntilEnd)}뒤 마감</TimeBox>}
          </ContentContainer>
        </InfoContainer>
      </StyledLink>
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

const StyledLink = styled(Link)`
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 기본 색상 유지 */
`;

const ImageContainer = styled.div.attrs<Pick<RaffleProps, 'imageUrls'>>(
  ({ imageUrls }) => ({
    style: { backgroundImage: `url(${imageUrls[0]})` },
  }),
)<Pick<RaffleProps, 'imageUrls'>>`
  width: 228px;
  height: 227px;
  border-radius: 5px;
  position: relative;
  margin-top: 6px;

  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const RaffleClosingBox = styled.div`
  width: 143.316px;
  height: 47.272px;
  transform: rotate(0.421deg);

  flex-shrink: 0;
  border-radius: 4px;
  border: 2px solid #c908ff;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;

  color: #c908ff;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px;
`;

const TextBox = styled.div`
  width: 78.929px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 42px;
  background: rgba(201, 8, 255, 0.2);

  position: absolute;
  top: 188px;
  right: 135.07px;
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
  cursor: pointer;
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
  font-size: 16px;
  font-weight: 400;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px; /* ✅ 글자 수 제한 */
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
