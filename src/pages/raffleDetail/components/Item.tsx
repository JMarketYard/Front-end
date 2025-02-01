import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BigTitle from '../../../components/BigTitle';
import icTicket from '../../../assets/raffleDetail/icon-ticket.svg';
import icLike from '../../../assets/raffleDetail/icon-like.svg';
import icUnlike from '../../../assets/raffleDetail/icon-unlike.svg';
import ImgSlider from './ImgSlider';
import DrawModal from '../../../components/Modal/modals/DrawModal';

interface ItemProps {
  id: number;
  marketId: string;
  images: string[];
  name: string;
  ticket: number;
  category: string;
  openTime: string;
  closeTime: string;
  description: string;
  participant: number;
  atLeastParticipant: number;
  view: number;
  like: number;
  role: 'p' | 'np' | 'h';
  raffleStatus: string;
  setRole: (role: 'p' | 'np' | 'h') => void;
  winner: 'y' | 'n' | 'idk';
  result: 'success' | 'less' | 'failed';
  countParticipant: () => void;
}

const Item = ({
  images,
  name,
  ticket,
  category,
  openTime,
  closeTime,
  description,
  participant,
  view,
  like: initialLike, // 초기 like 값
  role,
  raffleStatus,
  setRole,
  winner,
  result,
  countParticipant,
}: ItemProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLike);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const toggleLike = () => {
    setIsLiked((prevState) => !prevState);
    setLikeCount((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
  };

  const openModal = () => {
    setIsModalOpen(true); // 모달을 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달을 닫기
  };

  const handleRoleChange = () => {
    setRole('p'); // role을 'p'로 변경
    setIsModalOpen(false); // 모달을 닫기
  };

  return (
    <Wrapper>
      {isModalOpen && (
        <DrawModal
          onClose={closeModal}
          handleRoleChange={handleRoleChange}
          countParticipant={countParticipant}
          name={name}
          ticket={ticket}
          images={images}
        />
      )}

      <BigTitle>{name}</BigTitle>
      <TopLayout>
        <ImgSlider images={images} name={name}>
          {raffleStatus === 'ended' && (
            <RaffleClosingBox>응모 마감</RaffleClosingBox>
          )}
        </ImgSlider>
        <DetailLayout>
          <ItemTitleBox>{name}</ItemTitleBox>
          <ViewBox>
            조회 {view} · 찜 {likeCount}
          </ViewBox>
          <TicketBox>
            <img src={icTicket} alt="ticket" />
            {ticket}
          </TicketBox>
          <DetailContainer>
            <TitleBox>카테고리</TitleBox>
            <DescriptionBox>{category}</DescriptionBox>
          </DetailContainer>
          <DetailContainer>
            <TitleBox>응모오픈</TitleBox>
            <DescriptionBox>{openTime}</DescriptionBox>
          </DetailContainer>
          <DetailContainer>
            <TitleBox>응모마감</TitleBox>
            <DescriptionBox>{closeTime}</DescriptionBox>
            {raffleStatus === 'ended' && <TextBox>응모마감</TextBox>}
          </DetailContainer>

          <ButtonContainer>
            {/*래플 응모 중*/}
            {raffleStatus === 'ongoing' && (
              <ButtonContainer>
                {role === 'h' && <GrayButton>래플 결과</GrayButton>}
                {role === 'np' && (
                  <PurpleButton onClick={openModal}>응모하기</PurpleButton>
                )}
                {role === 'p' && (
                  <LightPurpleButton>응모 완료</LightPurpleButton>
                )}
              </ButtonContainer>
            )}

            {/*래플 응모 마감*/}
            {raffleStatus === 'ended' && (
              <ButtonContainer>
                {role === 'h' && (
                  <PinkButton onClick={() => navigate('/result')}>
                    래플 종료
                  </PinkButton>
                )}
                {result == 'success' && (
                  <ButtonContainer>
                    {role === 'np' && <GrayButton>래플 종료</GrayButton>}
                    {role === 'p' && (
                      <ButtonContainer>
                        {winner === 'y' && (
                          <PurpleButton onClick={() => navigate('/review')}>
                            후기남기기
                          </PurpleButton>
                        )}
                        {winner === 'n' && <GrayButton>래플 종료</GrayButton>}
                        {winner === 'idk' && <PurpleButton>DRAW</PurpleButton>}
                      </ButtonContainer>
                    )}
                  </ButtonContainer>
                )}
                {result == 'less' && (
                  <ButtonContainer>
                    {role === 'np' && <GrayButton>래플 종료</GrayButton>}
                    {role === 'p' && (
                      <LightPurpleButton>응모 완료</LightPurpleButton>
                    )}
                  </ButtonContainer>
                )}
                {result == 'failed' && (
                  <ButtonContainer>
                    <GrayButton>래플 종료</GrayButton>
                  </ButtonContainer>
                )}
              </ButtonContainer>
            )}

            <LikeBox onClick={toggleLike}>
              <img
                src={isLiked ? icLike : icUnlike}
                alt={isLiked ? 'Liked' : 'Unliked'}
              />{' '}
              찜하기
            </LikeBox>
          </ButtonContainer>
          <WarningBox>
            판매자 희망 최소 참여자 이상 모이지 않으면 당첨자 없이 취소될 수
            있습니다. 취소된 래플에 대한 티켓은 다시 적립됩니다.
          </WarningBox>
        </DetailLayout>
      </TopLayout>
      <BottomLayout>
        <TitleBox2>상품 설명</TitleBox2>
        <DescriptionBox2>{description}</DescriptionBox2>
      </BottomLayout>
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
  padding: 50px 109px 51px 67px;
  box-sizing: border-box;
  gap: 99.42px;
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
const ViewBox = styled.div`
  display: flex;
  width: 110px;
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
  position: relative;
  flex-direction: row;
  align-items: center;

  gap: 50px;
  padding-bottom: 26px;
`;
const TitleBox = styled.div`
  display: inline-block;
  min-width: 59px;

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

const TextBox = styled.div`
  width: 78.929px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 42px;
  background: rgba(201, 8, 255, 0.2);

  position: absolute;
  left: 362px;
  display: flex;
  justify-content: center;
  align-items: center;

  color: #c908ff;
  text-align: center;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 150% */
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 35px;
  padding-bottom: 19px;
`;

const PurpleButton = styled.button`
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

const LightPurpleButton = styled.button`
  width: 344px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 7px;
  border: 1px solid #c908ff;
  background: rgba(201, 8, 255, 0.2);

  color: #c908ff;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px; /* 90% */
  letter-spacing: -0.165px;
`;

const GrayButton = styled.button`
  width: 344px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 7px;
  border: 1px solid #8f8e94;
  background: #e4e4e4;

  color: #8f8e94;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px; /* 90% */
  letter-spacing: -0.165px;
`;

const PinkButton = styled.button`
  width: 344px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 7px;
  border: 1px solid #ff008c;
  background: #ff008c;

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
  gap: 12px;
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

const WarningBox = styled.div`
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

const BottomLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0 109px 30px 67px; //최상위 wrapper 기준으으로 다시 설정해야 하나?
  box-sizing: border-box;
  gap: 45px;
`;

const TitleBox2 = styled.div`
  display: inline-block;
  min-width: 94px;
  color: #8f8e94;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 27px */
`;

const DescriptionBox2 = styled.div`
  width: 749px;
  height: 132px;

  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
`;
