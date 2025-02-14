import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BigTitle from '../../../components/BigTitle';
import icTicket from '../../../assets/raffleDetail/icon-ticket.svg';
import icLike from '../../../assets/raffleDetail/icon-like.svg';
import icUnlike from '../../../assets/raffleDetail/icon-unlike.svg';
import ImgSlider from './ImgSlider';
import ApplyModal from './modal/ApplyModal';
import RaffleDetailProps from '../../../components/RaffleDetailProps';
import axiosInstance from '../../../apis/axiosInstance';
import { useParams, useLocation } from 'react-router-dom';
import RandomModal from './modal/RandomModal';
import { ApplyType } from './apis/raffleType';
import { useModalContext } from '../../../components/Modal/context/ModalContext';
import { useAuth } from '../../../context/AuthContext';
import SplashModal from '../../login/components/SplashModal';

const Item: React.FC<RaffleDetailProps> = (raffle) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(raffle.likeCount);
  const navigate = useNavigate();
  const { type } = useParams<{ type?: string }>();
  const typeNumber = type ? parseInt(type, 10) : undefined;
  const { isAuthenticated, logout } = useAuth();
  const { openModal } = useModalContext();

  const handleOpenModal = () => {
    openModal(({ onClose }) => <SplashModal onClose={onClose} />);
  };

  const toggleLike = () => {
    setIsLiked((prevState) => !prevState);
    setLikeCount((prevLike) => (isLiked ? prevLike - 1 : prevLike + 1));
  };

  const handleApply = async () => {
    const { data }: { data: ApplyType } = await axiosInstance.post(
      `/api/member/raffles/${type}/apply`,
    );
    openModal(({ onClose }) => (
      <ApplyModal
        onClose={onClose}
        name={raffle.name}
        ticket={raffle.ticketNum}
        image={raffle.imageUrls[0]}
        resultTime={raffle.endAt}
      />
    ));
    return data;
  };

  const handleWinner = async () => {
    const { data } = await axiosInstance.get(
      `/api/member/raffles/${type}/draw`,
    );
    const drawData = data.result;
    openModal(({ onClose }) => <RandomModal onClose={onClose} {...drawData} />);
  };

  const formatDate = (isoString: string) =>
    new Date(isoString).toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

  return (
    <Wrapper>
      <BigTitle>{raffle.name}</BigTitle>
      <TopLayout>
        <ImgSlider images={raffle.imageUrls} name={raffle.name}>
          {(raffle.raffleStatus === 'UNFULFILLED' ||
            raffle.raffleStatus === 'ENDED' ||
            raffle.raffleStatus === 'CANCELLED' ||
            raffle.raffleStatus === 'COMPLETED') && (
            <RaffleClosingBox>응모 마감</RaffleClosingBox>
          )}
        </ImgSlider>
        <DetailLayout>
          <ItemTitleBox>{raffle.name}</ItemTitleBox>
          <ViewBox>
            조회 {raffle.view} · 찜 {raffle.likeCount}
          </ViewBox>
          <TicketBox>
            <img src={icTicket} alt="ticket" />
            {raffle.ticketNum}
          </TicketBox>
          <DetailContainer>
            <TitleBox>카테고리</TitleBox>
            <DescriptionBox>{raffle.category}</DescriptionBox>
          </DetailContainer>
          <DetailContainer>
            <TitleBox>응모오픈</TitleBox>
            <DescriptionBox>{formatDate(raffle.startAt)}</DescriptionBox>
          </DetailContainer>
          <DetailContainer>
            <TitleBox>응모마감</TitleBox>
            <DescriptionBox>{formatDate(raffle.endAt)}</DescriptionBox>
            {(raffle.raffleStatus === 'UNFULFILLED' ||
              raffle.raffleStatus === 'ENDED' ||
              raffle.raffleStatus === 'CANCELLED' ||
              raffle.raffleStatus === 'COMPLETED') && (
              <TextBox>응모마감</TextBox>
            )}
          </DetailContainer>

          <ButtonContainer>
            {/*래플 오픈 전*/}
            {raffle.raffleStatus === 'UNOPENED' && (
              <GrayButton>응모 오픈 전</GrayButton>
            )}

            {/*래플 응모 중*/}
            {raffle.raffleStatus === 'ACTIVE' && (
              <>
                {raffle.userStatus === 'host' && (
                  <GrayButton>래플 결과</GrayButton>
                )}
                {raffle.userStatus === 'nonParticipant' && (
                  <PurpleButton
                    onClick={() => {
                      if (isAuthenticated) {
                        handleApply();
                      } else {
                        handleOpenModal();
                      }
                    }}
                  >
                    응모하기
                  </PurpleButton>
                )}
                {raffle.userStatus === 'participant' && (
                  <LightPurpleButton>응모 완료</LightPurpleButton>
                )}
              </>
            )}

            {/*래플 응모 마감*/}
            {(raffle.raffleStatus === 'UNFULFILLED' ||
              raffle.raffleStatus === 'ENDED') && (
              <>
                {raffle.userStatus === 'host' && (
                  <PinkButton
                    onClick={() =>
                      navigate('/host-result', {
                        state: {
                          id: raffle.deliveryId,
                          status: raffle.raffleStatus,
                        },
                      })
                    }
                  >
                    래플 결과
                  </PinkButton>
                )}
              </>
            )}
            {raffle.raffleStatus === 'ENDED' && (
              <>
                {raffle.userStatus === 'nonParticipant' && (
                  <GrayButton>래플 종료</GrayButton>
                )}
                {raffle.userStatus === 'participant' && (
                  <>
                    {raffle.isWinner === 'yes' && (
                      <PurpleButton onClick={handleWinner}>DRAW</PurpleButton>
                    )}
                    {raffle.isWinner === 'no' && (
                      <GrayButton>래플 종료</GrayButton>
                    )}
                    {raffle.isWinner === 'hope' && (
                      <PurpleButton onClick={handleWinner}>DRAW</PurpleButton>
                    )}
                  </>
                )}
              </>
            )}
            {raffle.raffleStatus === 'UNFULFILLED' && (
              <>
                {(raffle.userStatus === 'nonParticipant' ||
                  raffle.userStatus === 'participant') && (
                  <GrayButton>래플 종료</GrayButton>
                )}
              </>
            )}
            {raffle.raffleStatus === 'CANCELLED' && (
              <GrayButton>래플 종료</GrayButton>
            )}
            {raffle.raffleStatus === ' COMPLETED' && (
              <>
                {raffle.isWinner === 'yes' && (
                  <PurpleButton onClick={() => navigate('/review')}>
                    후기남기기
                  </PurpleButton>
                )}
                {raffle.isWinner === 'no' && <GrayButton>래플 종료</GrayButton>}
              </>
            )}
            <LikeBox onClick={toggleLike}>
              <img
                src={isLiked ? icLike : icUnlike}
                alt={isLiked ? 'Liked' : 'Unliked'}
              />
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
        <DescriptionBox2>{raffle.description}</DescriptionBox2>
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
  all: unset;
  display: block;
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
