import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import BigTitle from '../../components/BigTitle';
import grayDelivery from '../../assets/hostResult/grayDelivery.svg';
import icMark from '../../assets/hostResult/icMark.svg';
import axiosInstance from '../../apis/axiosInstance';
import { useModalContext } from '../../components/Modal/context/ModalContext';
import { DeliverySuccessResult } from './apis/deliveryResponseTypes';
import DeliverModal from './modal/DeliverModal';
import CancleModal from './modal/CancelModal';
import NewDrawerModal from './modal/NewDrawerModal';
import MakeDrawerModal from './modal/MakeDrawerModal';
import ConsiderModal from './modal/ConsiderModal';
import WaitModal from './modal/WaitModal';
import { formatMinutesToHoursAndMinutes } from '../../utils/FormatMinuitesToHourAndMinutes';
import { formatDate } from '../../utils/formatDate';

interface RaffleResult {
  raffleId: number;
  minTicket: number;
  applyTicket: number;
  totalAmount: number;
  remainedMinutes: number;
}

const ResultPage: React.FC = () => {
  const [delivery, setDelivery] = useState<DeliverySuccessResult>({
    raffleId: 0,
    winnerId: 0,
    deliveryId: 0,
    minTicket: 0,
    applyTicket: 0,
    finalAmount: 0,
    deliveryStatus: '',
    shippingDeadline: null,
    isExtendShipping: null,
    address: null,
  });
  const [raffle, setRaffle] = useState<RaffleResult>({
    raffleId: 0,
    minTicket: 0,
    applyTicket: 0,
    totalAmount: 0,
    remainedMinutes: 0,
  });
  const [deliveryStatus, setDeliveryStatus] = useState<string>('');

  const location = useLocation();
  const deliveryId = location.state?.deliveryId;
  const raffleStatus = location.state?.status;
  const raffleId = location.state?.raffleId;
  const [minTicket, setMinTicket] = useState<number>(0);
  const [applyTicket, setApplyTicket] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  useEffect(() => {
    console.log('개최자 결과 페이지 useEffect');

    const fetchResult = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/member/raffles/${raffleId}/result`,
        );
        console.log('fetchResult 결과:', data);
        setRaffle(data.result);
        setMinTicket(data.result.minTicket);
        setApplyTicket(data.result.applyTicket);
        setTotalAmount(data.result.totalAmount);
      } catch (error) {
        console.log('fetchResult, 래플 결과 안옴', error);
      }
    };
    fetchResult();

    const fetchDelivery = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/member/delivery/${deliveryId}/owner`,
        );
        console.log('fetchDelivery 결과:', data);

        setDelivery(data.result);
        setDeliveryStatus(data.result.deliveryStatus);
        setMinTicket(data.result.minTicket);
        setApplyTicket(data.result.applyTicket);
        setTotalAmount(data.result.finalAmount);
      } catch (error) {
        console.log('fetchDelivery, 아직 배송지 안 줬음', error);
      }
    };
    fetchDelivery();
  }, [deliveryId, deliveryStatus, isChecked]);

  //모달
  const { openModal } = useModalContext();
  const handleDelver = () => {
    openModal(({ onClose }) => (
      <DeliverModal onClose={onClose} deliveryId={deliveryId} />
    ));
  };
  const handleEnd = () => {
    console.log('래플 아이디는:', raffle?.raffleId);
    openModal(({ onClose }) => (
      <CancleModal onClose={onClose} raffleId={raffle?.raffleId ?? 0} />
    ));
  };
  const handleNew = () => {
    openModal(({ onClose }) => (
      <NewDrawerModal onClose={onClose} raffleId={delivery?.raffleId ?? 0} />
    ));
  };
  const handleMake = () => {
    openModal(({ onClose }) => (
      <MakeDrawerModal
        onClose={onClose}
        raffleId={raffle?.raffleId ?? 0}
        setIsChecked={setIsChecked}
      />
    ));
  };
  const handleWait = () => {
    openModal(({ onClose }) => (
      <WaitModal onClose={onClose} deliveryId={deliveryId} />
    ));
  };
  const handleConsider = () => {
    openModal(({ onClose }) => (
      <ConsiderModal onClose={onClose} deliveryId={deliveryId} />
    ));
  };
  const navigate = useNavigate();
  return (
    <Wrapper>
      <BigTitle>래플 결과</BigTitle>
      <ResultLayout>
        <ResultContainer>
          <TextBox>최소 마감 티켓</TextBox>
          <TextBox>{minTicket} 개</TextBox>
        </ResultContainer>
        <ResultContainer>
          <TextBox>현재 티켓</TextBox>
          {applyTicket >= minTicket && (
            <PurpleTextBox>{applyTicket} 개</PurpleTextBox>
          )}
          {applyTicket < minTicket && (
            <GrayTextBox>{applyTicket} 개</GrayTextBox>
          )}
        </ResultContainer>
        <HorizonBox />
        <ResultContainer>
          <TextBox>배송 후 정산금액</TextBox>
          <PurpleTextBox>{totalAmount} 원</PurpleTextBox>
        </ResultContainer>
        <ResultContainer>
          {raffleStatus === 'ENDED' && (
            <>
              <DeliverStausBox>당첨자 배송비 결제 현황</DeliverStausBox>
              {(deliveryStatus === 'WAITING_ADDRESS' ||
                deliveryStatus === 'WAITING_PAYMENT') && (
                <>
                  <DeliveryWaitBox>배송지 입력 대기</DeliveryWaitBox>
                </>
              )}
              {(deliveryStatus === 'READY' || deliveryStatus === 'SHIPPED') && (
                <>
                  <DeliveryDoneBox>배송 가능</DeliveryDoneBox>
                </>
              )}
              {deliveryStatus === 'ADDRESS_EXPIRED' && (
                <>
                  <DeliveryTimeoverBox>
                    <img src={icMark} /> 배송지 입력기한 초과
                  </DeliveryTimeoverBox>
                </>
              )}
            </>
          )}
        </ResultContainer>
        {raffleStatus == 'ENDED' && (
          <>
            {(deliveryStatus === 'WAITING_ADDRESS' ||
              deliveryStatus === 'WAITING_PAYMENT' ||
              deliveryStatus === 'ADDRESS_EXPIRED') && (
              <GrayAddressBox>
                <img src={grayDelivery} />
              </GrayAddressBox>
            )}
            {deliveryStatus === 'READY' && (
              <WhiteAddressBox>
                <NameBox>{delivery.address?.recipientName}</NameBox>
                <VerticalBox />
                <AddressBox>
                  ({delivery.address?.addressId})
                  {delivery.address?.addressDetail}(
                  {delivery.address?.phoneNumber})
                </AddressBox>{' '}
              </WhiteAddressBox>
            )}
          </>
        )}
      </ResultLayout>
      <ButtonContainer>
        {raffleStatus == 'ENDED' && (
          <>
            {(deliveryStatus === 'WAITING_ADDRESS' ||
              deliveryStatus === 'WAITING_PAYMENT' ||
              deliveryStatus === 'ADDRESS_EXPIRED') && (
              <>
                <GrayButtonBox>운송장 입력하기</GrayButtonBox>
                <GrayButtonBox>
                  나중에 입력하기 (입력기한 :{' '}
                  {formatDate(delivery?.shippingDeadline)})
                </GrayButtonBox>
              </>
            )}
            {deliveryStatus === 'READY' && (
              <>
                <PurpleButtonBox onClick={handleDelver}>
                  운송장 입력하기
                </PurpleButtonBox>
                <PurpleButtonBox
                  onClick={() => navigate(`/raffles/${raffleId}`)}
                >
                  나중에 입력하기 (입력기한 :{' '}
                  {formatDate(delivery?.shippingDeadline)})
                </PurpleButtonBox>
              </>
            )}
            {deliveryStatus === 'SHIPPED' && (
              <>
                <GrayButtonBox>운송장 입력완료</GrayButtonBox>
                <PurpleButtonBox
                  onClick={() => navigate(`/raffles/${raffleId}`)}
                >
                  래플 보러가기
                </PurpleButtonBox>
              </>
            )}
            {deliveryStatus === 'ADDRESS_EXPIRED' && (
              <>
                <PurpleButtonBox onClick={handleEnd}>
                  래플 강제종료
                </PurpleButtonBox>
                <PurpleButtonBox onClick={handleNew}>
                  새로운 당첨자 뽑기
                </PurpleButtonBox>
                <PurpleButtonBox onClick={handleWait}>
                  기다리기(
                  {formatMinutesToHoursAndMinutes(raffle.remainedMinutes)})
                </PurpleButtonBox>
              </>
            )}
          </>
        )}
        {raffleStatus === 'UNFULFILLED' && (
          <>
            <PurpleButtonBox onClick={handleEnd}>래플 강제종료</PurpleButtonBox>
            <PurpleButtonBox onClick={handleMake}>
              당첨자 추첨 진행
            </PurpleButtonBox>
            <PurpleButtonBox onClick={handleConsider}>
              나중에 선택하기(
              {formatMinutesToHoursAndMinutes(raffle.remainedMinutes)})
            </PurpleButtonBox>
          </>
        )}
      </ButtonContainer>
    </Wrapper>
  );
};

export default ResultPage;

const Wrapper = styled.div`
  width: 1080px;
  min-height: 1498px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 63px;
`;

const ResultLayout = styled.div`
  width: 636px;
  height: 310px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 105px auto 243px auto;
`;

const ResultContainer = styled.div`
  width: 100%;
  height: 25px;
  margin-bottom: 26px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextBox = styled.div`
  display: flex;
  height: 19.215px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 5 100%; /* 20px */
`;

const GrayTextBox = styled.div`
  display: flex;
  height: 19.215px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  color: #8f8e94;
  text-align: right;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 20px */
`;

const PurpleTextBox = styled.div`
  display: flex;
  height: 19.215px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  color: #c908ff;
  text-align: right;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 20px */
`;

const HorizonBox = styled.hr`
  width: 100%;
  height: 1px;
  background: #000;
  margin: 2px 0 28px 0;
`;

const DeliverStausBox = styled.div`
  display: flex;
  width: 200px;
  height: 20px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;

  color: #8f8e94;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 18px */
`;

const DeliveryWaitBox = styled.div`
  display: flex;
  height: 25px;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;

  border-radius: 31px;
  border: 1px solid #8f8e94;

  color: #8f8e94;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 36.832px; /* 263.085% */
`;

const DeliveryDoneBox = styled.div`
  display: flex;
  height: 25px;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;

  border-radius: 31px;
  border: 1px solid #c908ff;

  color: #c908ff;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 36.832px; /* 263.085% */
`;

const DeliveryTimeoverBox = styled.div`
  display: flex;
  width: 194px;
  height: 20px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;

  color: #ff008c;
  text-align: right;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 36.832px; /* 263.085% */

  img {
    width: 15px;
    height: 15px;
  }
`;

const WhiteAddressBox = styled.div`
  width: 636px;
  height: 59px;
  box-sizing: border-box;
  border-radius: 10px;
  border: 1px solid #8f8e94;
  margin-top: 45px;
  padding: 0 2px 0 27.5px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const NameBox = styled.div`
  display: flex;
  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const VerticalBox = styled.div`
  width: 1px;
  height: 47px;
  background: #8f8e94;
  margin: 0 27.5px;
`;
const AddressBox = styled.div`
  display: flex;
  color: #000;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 15.763px; /* 112.59% */
`;

const GrayAddressBox = styled.div`
  width: 636px;
  height: 59px;
  margin-top: 45px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 47px;
`;

const GrayButtonBox = styled.div`
  width: 474px;
  min-height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 7px;
  border: 1px solid #8f8e94;
  background: #e4e4e4;

  color: #8f8e94;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 100% */
  letter-spacing: -0.165px;
`;

const PurpleButtonBox = styled.button`
  width: 474px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 7px;
  background: #c908ff;
  border: none;

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

const VerticalLine = styled.div`
  width: 1px;
  height: 40px;
  background-color: #8f8e94;
  margin-right: 10px;
`;

const DottedLine = styled.div`
  flex-grow: 1;
  height: 2px;
  border-bottom: 2px dashed #8f8e94;
`;
