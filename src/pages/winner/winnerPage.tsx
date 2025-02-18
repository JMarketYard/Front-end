import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BigTitle from '../../components/BigTitle';
import RaffleDetailProps from '../../types/RaffleDetailProps';
import axiosInstance from '../../apis/axiosInstance';
import { useNavigate, useLocation } from 'react-router-dom';
import moreList from '../../assets/homePage/moreList.svg';
import media from '../../styles/media';
import { TAddress } from '../address/addressSetPage';
import { TDeliveryStatus } from '../../types/deliveryStatus';
import { ReactComponent as checkbox } from '../../assets/imgCheckbox.svg';
import icWarning from '../../assets/icWarning.svg';
import { useModalContext } from '../../components/Modal/context/ModalContext';
import GiveUpModal from './modals/GiveUpModal';
import { Icon } from '@iconify/react';
import CompletedModal from './modals/CompletedModal';

export type TWinner = {
  raffleId: number;
  winnerId: number;
  deadline: string;
  shippingFee: number;
  deliveryStatus: TDeliveryStatus;
  isExtendShipping: boolean;
  address: TAddress | null;
};

const WinnerPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const deliveryId = location.state?.deliveryId ?? '';
  const image = location.state?.image ?? '';
  const { openModal } = useModalContext();

  const [address, setAddress] = useState<TAddress>({
    addressId: 0,
    addressName: '',
    recipientName: '',
    addressDetail: '',
    phoneNumber: '',
    isDefault: false,
  });
  const [deliveryStatus, setDeliveryStatus] = useState<TDeliveryStatus>();
  const isShipped =
    deliveryStatus === 'SHIPPED' || deliveryStatus === 'COMPLETED';

  const fetchAddress = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/member/delivery/${deliveryId}/winner`,
      );

      setDeliveryStatus(data.result.deliveryStatus);
      setAddress(data.result.address);
      console.log(data.result.address);
    } catch (error) {
      console.error(error);
    }
  };
  fetchAddress();

  const handleGiveUpModal = () => {
    openModal(({ onClose }) => <GiveUpModal onClose={onClose} />);
  };

  const handleCompletedModal = () => {
    openModal(({ onClose }) => <CompletedModal onClose={onClose} />);
  };

  if (0) {
    // 운송장 입력기한 만료 (당첨자의 선택이 필요함)
    // deliveryStatus === 'SHIPPING_EXPIRED'
    return (
      <Wrapper>
        <BigTitle>래플 결과</BigTitle>
        <RaffleLayout>
          <Box src={image} alt="상품 이미지" />
          <RaffleContainer>
            <NameBox>로지텍 무소음 마우스</NameBox>
            <DateBox>당첨 일시 : </DateBox>
          </RaffleContainer>
        </RaffleLayout>
        <Mark>!</Mark>
        <InfoBox1>해당 래플 개최자가 운송장을 입력하지 않았습니다.</InfoBox1>
        <InfoBox2>당첨을 포기하겠습니까?</InfoBox2>

        <ButtonLayout2>
          <PurpleButton onClick={handleGiveUpModal}>당첨 포기하기</PurpleButton>
          <WarningContainer>
            <img src={icWarning} />
            <WarningBox>
              당첨을 포기 할 경우 티켓과 배송비는 환불됩니다. 개최자는 일주일간
              활동정지되며, 미발송 상점 횟수가 프로필에 표시됩니다.
            </WarningBox>
          </WarningContainer>

          <PurpleButton onClick={() => navigate('/')}>
            기다리기 (24시간)
          </PurpleButton>
        </ButtonLayout2>
      </Wrapper>
    );
  } else {
    if (0) {
      //(deliveryStatus === 'WAITING_ADDRESS' || deliveryStatus === 'WAITING_PAYMENT')
      return (
        <Wrapper>
          <BigTitle>
            당첨자 정보
            <MoreListBox onClick={() => navigate('/address')}>
              배송지 목록 조회
              <img src={moreList} alt="moreList" />
            </MoreListBox>
          </BigTitle>

          <AddressLayout>
            <Checkbox fill={'#C908FF'} />
            <AddressContainer>
              <TitleSpan>주소이름{address.addressName}</TitleSpan>
              <DefaultBox>기본 배송지</DefaultBox>
              <AddressSpan>
                서울특별시 마포구 와우산로 94 홍익대학교 제2기숙사
                {address.addressDetail}
              </AddressSpan>
            </AddressContainer>
          </AddressLayout>

          <InfoLayout>
            <InfoContainer>
              <SmallTitleSpan>당첨자 배송비 결제현황</SmallTitleSpan>
              <SmallGraySpan>배송지 입력 대기</SmallGraySpan>
            </InfoContainer>
            <Hr />
            <InfoContainer>
              <SmallTitleSpan>개최자 운송장번호 입력현황</SmallTitleSpan>
              <SmallGraySpan>운송장번호 입력 대기</SmallGraySpan>
            </InfoContainer>
            <Hr />
            <InfoContainer>
              <SmallTitleSpan>운송장번호</SmallTitleSpan>
              <SmallGraySpan>-------</SmallGraySpan>
            </InfoContainer>
            <Hr />
            <p>전체 동의</p>
            <FeeContainer>
              <FeeTitleBox>배송비</FeeTitleBox>
              <FeeAmountBox>4000 원</FeeAmountBox>
            </FeeContainer>
          </InfoLayout>

          <ButtonLayout>
            <KakaoButtons>
              <ResponsiveIcon icon="raphael:bubble" />
              <Kakao>카카오페이로 결제하기</Kakao>
            </KakaoButtons>
            <PurpleButton onClick={() => navigate('/')}>
              나중에 결제하기(입력기한 : 1/12)
            </PurpleButton>
          </ButtonLayout>
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <BigTitle>
            당첨자 정보
            <MoreListBox onClick={() => navigate('/address')}>
              배송지 목록 조회
              <img src={moreList} alt="moreList" />
            </MoreListBox>
          </BigTitle>

          <InfoLayout>
            <InfoContainer>
              <SmallTitleSpan>당첨자 배송비 결제현황</SmallTitleSpan>
              <SmallPurpleSpan>결제 완료</SmallPurpleSpan>
            </InfoContainer>
            <Hr />
            <InfoContainer>
              <SmallTitleSpan>개최자 운송장번호 입력현황</SmallTitleSpan>
              <SmallPurpleSpan>운송장번호 입력 완료</SmallPurpleSpan>
            </InfoContainer>
            <Hr />
            <InfoContainer>
              <SmallTitleSpan>운송장번호</SmallTitleSpan>
              <SmallPurpleSpan>0000</SmallPurpleSpan>
            </InfoContainer>
            <Hr />
            <FeeContainer>
              <FeeTitleBox>배송비</FeeTitleBox>
              <FeeAmountBox>4000 원</FeeAmountBox>
            </FeeContainer>
          </InfoLayout>

          <ButtonLayout>
            <PurpleButton onClick={handleCompletedModal}>
              거래 완료
            </PurpleButton>
            <PurpleButton
              onClick={() =>
                navigate('/review', {
                  state: { deliveryId: 1 },
                })
              }
            >
              후기 작성하기
            </PurpleButton>
            {/*state 수정!!*/}
            <PurpleButton onClick={() => navigate('/')}>
              홈 화면으로 돌아가기
            </PurpleButton>
          </ButtonLayout>
        </Wrapper>
      );
    }
  }
};

export default WinnerPage;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 63px;
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

const AddressLayout = styled.div`
  display: flex;
  width: 805px;
  align-items: center;
  gap: 40px;
  margin: 46px 0 172px 0;
`;

const Checkbox = styled(checkbox)`
  width: 27.2px;
  height: 27.1px;
  /* &:hover {
    cursor: pointer;
  } */

  ${media.medium`
    width: 21px;
    height: 21px;
  `}
`;

const AddressContainer = styled.div`
  display: flex;
  box-sizing: content-box;
  max-height: 59px;
  padding: 17px 41px;
  align-items: center;
  justify-content: space-between;
  flex: 1 0 0;
  border-radius: 21px;
  border: 1px solid #8f8e94;
`;

const TitleSpan = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  // width: 100px;
`;

const AddressSpan = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 20.363px; /* 113.13% */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 460px;
  ${media.medium`
  width: 229px;
`}
`;

const DefaultBox = styled.div`
  display: flex;
  height: 25px;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 31px;
  border: 1px solid #c908ff;

  color: #c908ff;
  text-align: center;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 36.832px; /* 263.085% */
`;

const InfoLayout = styled.div`
  min-width: 490px;
  display: flex;
  flex-direction: column;
  margin-top: 66px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const SmallTitleSpan = styled.span`
  color: #000;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 17.308px; /* 115.385% */
`;

const SmallGraySpan = styled.span`
  color: #8f8e94;
  text-align: right;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 17.308px; /* 115.385% */
`;

const SmallPurpleSpan = styled.span`
  color: #c908ff;
  text-align: right;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 17.308px; /* 115.385% */
`;

const SmallBlackSpan = styled.span`
  color: #000;
  text-align: right;
  font-family: Pretendard;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 17.308px; /* 115.385% */
`;

const Hr = styled.hr`
  width: 100%;
  height: 1px;
  background: #8f8e94;
  margin: 7.5px 0 14.8px 0;
`;

const ButtonLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-width: 474px;
  gap: 47px;
`;

const PurpleButton = styled.button`
  all: unset;
  width: 100%;
  height: 46px;
  border-radius: 7px;
  background: #c908ff;

  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  cursor: pointer;
`;

const Box = styled.img`
  width: 209px;
  height: 209px;
  flex-shrink: 0;
  background: #f5f5f5;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const NameBox = styled.div`
  display: flex;
  width: 209px;
  height: 29px;
  flex-direction: column;
  justify-content: center;

  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
`;

const DateBox = styled.div`
  display: flex;
  width: 277px;
  height: 20px;
  flex-direction: column;
  justify-content: center;

  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 30px */
`;

const RaffleLayout = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 725px;
  justify-content: center;
  align-items: center;
  gap: 76.5px;
  margin-top: 54px;
`;

const RaffleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
`;

const Mark = styled.div`
  display: flex;
  width: 71px;
  height: 71px;
  margin: 51px 0 27px 0;
  flex-direction: column;
  justify-content: center;
  background-color: #f5f5f5;

  border-radius: 50px;
  color: #8f8e94;
  text-align: center;
  font-family: Pretendard;
  font-size: 50px;
  font-style: normal;
  font-weight: 500;
  line-height: 134.814%; /* 67.407px */
`;

const InfoBox1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #8f8e94;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 134.814%; /* 24.266px */
`;

const InfoBox2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #8f8e94;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 134.814%;
`;

const ButtonLayout2 = styled.div`
  margin-top: 149px;
`;

const WarningContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 17px 0 29px 0;
`;

const WarningBox = styled.div`
  display: flex;
  width: 424px;
  height: 28px;
  flex-direction: column;
  justify-content: center;
  color: #c908ff;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const FeeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 12px;
  margin: 89px 0 47px 0;
`;

const FeeTitleBox = styled.div`
  display: flex;
  width: 50px;
  height: 20px;
  flex-direction: column;
  justify-content: center;

  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 17.308px; /* 96.154% */
`;

const FeeAmountBox = styled.div`
  display: flex;
  width: 92px;
  height: 20px;
  flex-direction: column;
  justify-content: center;

  color: #000;
  text-align: right;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 17.308px; /* 96.154% */
`;

const KakaoButtons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 46px;
  border-radius: 7px;
  border: 0;
  background-color: #fbe44e;
  color: black;
`;

const Kakao = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transform: translateY(1px);
  color: #000;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  ${media.notLarge`
      font-size: 15px;
    `}
`;

const ResponsiveIcon = styled(Icon)`
  width: 24px;
  height: 20px;
  color: black;

  ${media.notLarge`
    width: 19px; 
    height: 15px;
  `}
`;
