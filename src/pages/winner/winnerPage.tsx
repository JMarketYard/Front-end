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

  const fetchAddresse = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/member/delivery/${deliveryId}/winner`,
      );

      setAddress(data.result.address);
      console.log(data.result.address);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <BigTitle>
        당첨자 정보
        <MoreListBox onClick={() => navigate('/address')}>
          배송지 목록 조회
          <img src={moreList} alt="moreList" />
        </MoreListBox>
      </BigTitle>
      <AddressContainer></AddressContainer>
    </Wrapper>
  );
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

const AddressContainer = styled.div``;
