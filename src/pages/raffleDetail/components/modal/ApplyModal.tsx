import React from 'react';
import Modal from '../../../../components/Modal/Modal';
import styled from 'styled-components';
import icTicket from '../../../../assets/ticket.svg';
import { useModalContext } from '../../../../components/Modal/context/ModalContext';
import ApplyOkModal from './ApplyOkModal';
import ApplyFailModal from './ApplyFailModal';
import { useState } from 'react';
import axiosInstance from '../../../../apis/axiosInstance';
import { useParams, useLocation, data } from 'react-router-dom';
import {
  ApplyResponse,
  ApplySuccessResult,
  ApplyFailureMissingTickets,
} from '../apis/applyResponseTypes';

interface ModalProps {
  onClose: () => void;
  image: string;
  name: string;
  ticket: number;
  resultTime: string;
  setIsApplying: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApplyModal: React.FC<ModalProps> = ({
  onClose,
  image,
  name,
  ticket,
  resultTime,
  setIsApplying,
}) => {
  const { openModal } = useModalContext();
  const { type } = useParams<{ type?: string }>();
  const typeNumber = type ? parseInt(type, 10) : undefined;

  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        `/api/member/raffles/${typeNumber}/apply`,
        {},
      );

      if (response.data.code === 'COMMON_200') {
        console.log('응모성공');
        setIsApplying((prev: boolean) => !prev);
        openModal(({ onClose }) => (
          <ApplyOkModal
            onClose={onClose}
            resultTime={resultTime}
            image={image}
          />
        ));
      }
      if (response.data.code === 'APPLY_4001') {
        console.log('티켓부족');
        openModal(({ onClose }) => (
          <ApplyFailModal
            onClose={onClose}
            image={image}
            name={name}
            ticket={response.data.result.missingTickets}
          />
        ));
      }
    } catch (error) {
      console.log('에러 : ', error);
    }
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <Container>
        <Box src={image} alt="상품 이미지" />
        <Title>{name}</Title>
        <Short>해당 상품에 응모하시겠습니까?</Short>
        <TicketBox>
          <Img src={icTicket} />
          <Ticket>{ticket}</Ticket>
        </TicketBox>
        <Button onClick={handleSubmit}>응모하기</Button>
        <Info>응모 후 취소할 수 없습니다.</Info>
      </Container>
    </Modal>
  );
};

const Info = styled.div`
  margin-top: 11px;
  color: #8f8e94;
  font-family: Pretendard;
  font-size: 11px;
  font-style: normal;
  font-weight: 500;
`;

const Ticket = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
`;

const TicketBox = styled.div`
  display: flex;
  column-gap: 13px;
  margin-bottom: 35px;
`;

const Img = styled.img`
  width: 26px;
  height: 16px;
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

const Short = styled.div`
  margin-top: 12px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 37px;
`;

const Title = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`;

const Box = styled.img`
  width: 190px;
  height: 190px;
  flex-shrink: 0;
  background: #d9d9d9;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

ApplyModal.displayName = 'ApplyModal';
export default ApplyModal;
