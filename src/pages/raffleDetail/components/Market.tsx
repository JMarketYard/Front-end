import styled from 'styled-components';
import moreList from '../../../assets/homePage/moreList.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icLevel from '../../../assets/raffleDetail/icon-level.svg';
import RaffleDetailProps from '../../../types/RaffleDetailProps';
import axiosInstance from '../../../apis/axiosInstance';
import { useAuth } from '../../../context/AuthContext';
import { useModalContext } from '../../../components/Modal/context/ModalContext';
import SplashModal from '../../login/components/SplashModal';
import FollowFailModal from './modal/FollowFailModal';

interface MarketProps extends RaffleDetailProps {
  type?: string;
}

const Market: React.FC<MarketProps> = ({ type, ...raffle }) => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false); // 팔로우 상태
  const [followCount, setFollowCount] = useState<number>(raffle.followCount);
  const { isAuthenticated, logout } = useAuth();
  const { openModal } = useModalContext();

  const handleAsk = () => {
    navigate(`/ask/${type}`, { state: raffle });
  };

  const handleOpenModal = () => {
    openModal(({ onClose }) => <SplashModal onClose={onClose} />);
  };

  const handleFollowFail = () => {
    openModal(({ onClose }) => <FollowFailModal onClose={onClose} />);
  };

  const handleFollow = async () => {
    if (isFollowing) {
      try {
        const { data } = await axiosInstance.delete(
          '/api/member/follow/cancel',
          { params: { storeId: raffle.storeId } },
        );
        console.log('상점 언팔로우 : ', data.message);
        setIsFollowing(false);
        setFollowCount((prev) => prev - 1); // 팔로워 수 증가
      } catch (error) {
        console.error('에러 : 팔로우 상태가 아님', error);
        setIsFollowing(false);
      }
    } else {
      try {
        const { data } = await axiosInstance.post(
          '/api/member/follow/',
          {},
          { params: { storeId: raffle.storeId } },
        );
        console.log('상점 팔로우 : ', data.message);
        setIsFollowing(true);
        setFollowCount((prev) => prev + 1); // 팔로워 수 증가
      } catch (error) {
        console.error('에러 : 이미 팔로잉 중', error);
        setIsFollowing(true);
      }
    }
  };

  return (
    <Wrapper>
      <BigTitleBox>
        <TitleIcon />
        <div>상점 정보</div>
        <MoreListBox
          onClick={() =>
            navigate(`/market/${raffle.storeId}`, {
              state: { storeId: raffle.storeId },
            })
          }
        >
          프로필 보기
          <img src={moreList} alt="moreList" />
        </MoreListBox>
      </BigTitleBox>
      <MarketLayout>
        <ImageBox />
        <MarketContainer>
          <NicknameBox>
            <img src={icLevel} alt="레벨" />
            {raffle.nickname}
          </NicknameBox>
          <MarketInfo>
            <KeyBox>팔로워</KeyBox>
            <ValueBox>{followCount}</ValueBox>
            <VerticalDivider />
            <KeyBox>후기 </KeyBox>
            <ValueBox>{raffle.reviewCount}</ValueBox>
          </MarketInfo>
        </MarketContainer>
      </MarketLayout>
      <ButtonLayout>
        {raffle.userStatus === 'host' && (
          <FollowFailButton
            onClick={() => {
              handleFollowFail(); // 내 계정은 팔로우 할 수 없습니다.
            }}
          >
            팔로우하기
          </FollowFailButton>
        )}
        {raffle.userStatus !== 'host' && (
          <FollowButton
            onClick={() => {
              if (isAuthenticated) {
                handleFollow();
              } else {
                handleOpenModal(); // 로그인 모달 띄우기
              }
            }}
          >
            {isFollowing ? '팔로잉 취소' : '팔로우하기'}
          </FollowButton>
        )}
        <ReviewButton>상점 후기</ReviewButton>
      </ButtonLayout>
      <AskButton onClick={() => navigate(`/ask/${type}`)}>상품 문의</AskButton>
    </Wrapper>
  );
};

export default Market;

const Wrapper = styled.div`
  width: 666px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BigTitleBox = styled.div`
  width: 100%;
  height: 53px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
  margin-bottom: 56px;
  color: #000;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const TitleIcon = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  background-color: #c908ff;
  border-radius: 50%;
  margin-right: 52px;
`;

const MoreListBox = styled.a`
  width: 220px;
  height: 34px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  display: flex;
  color: #8f8e94;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 36.832px; /* 230.199% */
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;

  img {
    width: 10px;
    height: 17px;
    margin-left: 35px;
  }

  cursor: pointer;
`;

const MarketLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ImageBox = styled.div`
  width: 78px;
  height: 78px;
  background-color: #d9d9d9;
  border: 1px solid #8f8e94;
  margin-right: 30px;
  border-radius: 50%;
`;

const MarketContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NicknameBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 21.07px;
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 30px */
`;

const MarketInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const KeyBox = styled.div`
  margin-right: 5px;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */
`;

const ValueBox = styled.div`
  color: #c908ff;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 27px;
  background: #000000;
  margin: 0 35px;
`;

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 35px;
  margin: 30px 0 71.5px 0;
`;

const FollowFailButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 162px;
  height: 38.5px;
  border-radius: 9px;
  border: 1px solid #8f8e94;
  background: #e4e4e4;

  color: #8f8e94;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */

  cursor: pointer;
`;

const FollowButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 162px;
  height: 38.5px;
  border-radius: 9px;
  border: 1px solid #c908ff;
  background: #c908ff;

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */

  cursor: pointer;
`;

const ReviewButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 162px;
  height: 38.5px;
  border-radius: 9px;
  border: 1px solid #8f8e94;
  background: white;

  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */

  cursor: pointer;
`;

const AskButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 221px;
  height: 34px;
  border-radius: 9px;
  border: 1px solid #8f8e94;
  background: #e4e4e4;

  color: #8f8e94;
  text-align: center;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 22.5px */

  cursor: pointer;
`;
