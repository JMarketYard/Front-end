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
  const { deliveryId } = location.state || {};
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
  if (deliveryStatus === 'SHIPPING_EXPIRED') {
    <Hr />;
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
        {(deliveryStatus === 'WAITING_ADDRESS' ||
          deliveryStatus === 'WAITING_PAYMENT') && (
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
        )}

        <InfoLayout>
          <InfoContainer>
            <SmallTitleSpan>당첨자 배송비 결제현황</SmallTitleSpan>
            {(deliveryStatus === 'WAITING_ADDRESS' ||
              deliveryStatus === 'WAITING_PAYMENT') && (
              <SmallGraySpan>배송지 입력 대기</SmallGraySpan>
            )}
            {(deliveryStatus === 'READY' || deliveryStatus === 'SHIPPED') && (
              <SmallPurpleSpan>결제 완료</SmallPurpleSpan>
            )}
          </InfoContainer>
          <Hr />
          <InfoContainer>
            <SmallTitleSpan>개최자 운송장번호 입력현황</SmallTitleSpan>
            {isShipped ? (
              <SmallPurpleSpan>운송장번호 입력 완료</SmallPurpleSpan>
            ) : (
              <SmallGraySpan>운송장번호 입력 대기</SmallGraySpan>
            )}
          </InfoContainer>
          <Hr />
          <InfoContainer>
            <SmallTitleSpan>운송장번호</SmallTitleSpan>
            {isShipped ? (
              <SmallPurpleSpan>0000</SmallPurpleSpan>
            ) : (
              <SmallGraySpan>-------</SmallGraySpan>
            )}
          </InfoContainer>
          <Hr />
        </InfoLayout>
        <ButtonLayout>
          <PurpleButton>거래 완료</PurpleButton>
          <PurpleButton onClick={() => navigate('/')}>
            후기 작성하기
          </PurpleButton>
          {/*state 수정!!*/}
          <PurpleButton
            onClick={() =>
              navigate('/review', {
                state: { deliveryId: 1 },
              })
            }
          >
            홈 화면으로 돌아가기
          </PurpleButton>
        </ButtonLayout>
      </Wrapper>
    );
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
