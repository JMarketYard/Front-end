import React from 'react';
import styled from 'styled-components';
import Modal from '../../../components/Modal/Modal';
import smileVector from '../../../assets/SmileVector.png';
import { Navigate, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../apis/axiosInstance';
import { DeliverySuccessResult } from '../types/hostResponseTypes';
import { useEffect, useState } from 'react';

interface ModalProps {
  onClose: () => void;
  raffleId: number;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  deliveryId: number;
}
//미추첨 당첨자 뽑기 완료
const MakeDrawerOkModal: React.FC<ModalProps> = ({
  onClose,
  raffleId,
  setIsChecked,
  deliveryId,
}) => {
  const navigate = useNavigate();
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
  const handleClick = async () => {
    try {
      const { data } = await axiosInstance.post(
        `/api/member/raffles/${raffleId}/draw`,
      );
      setDelivery(data.result);
      console.log('수동 추첨함 : ', data.result);
    } catch (error) {
      error;
    }
    onClose();
    setIsChecked((prev: boolean) => !prev);
    navigate(`/host-result`, {
      state: {
        deliveryId: delivery.deliveryId,
      },
    });
  };
  return (
    <Modal onClose={onClose}>
      <Container>
        <Img src={smileVector} />
        <Title>당첨자를 뽑으시겠습니까?</Title>
        <Short>해당 결정은 번복할 수 없습니다. </Short>
        <Button onClick={handleClick}>닫기</Button>
      </Container>
    </Modal>
  );
};

const Short = styled.div`
  margin-bottom: 127px;
  color: #c908ff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

const Button = styled.button`
  width: 302px;
  height: 39px;
  border-radius: 7px;
  background-color: #c908ff;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
`;

const Title = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Img = styled.img`
  width: 67px;
  height: 65px;
  margin-top: 75px;
  margin-bottom: 41px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default MakeDrawerOkModal;
