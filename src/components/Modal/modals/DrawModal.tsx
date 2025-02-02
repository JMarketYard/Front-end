import React from 'react';
import Modal from '../Modal';
import styled from 'styled-components';
import icTicket from '../../../assets/ticket.svg';
import { useModalContext } from '../context/ModalContext';
import DrawOkModal from './DrawOkModal';

interface ModalProps {
  onClose: () => void;
  handleRoleChange: () => void;
  countParticipant: () => void;
  images: string[];
  name: string;
  ticket: number;
}

const DrawModal: React.FC<ModalProps> = ({
  onClose,
  handleRoleChange,
  countParticipant,
  images,
  name,
  ticket,
}) => {
  const itemImg = images[0];

  const { openModal } = useModalContext();

  const handleSubmit = () => {
    openModal(({ onClose }) => <DrawOkModal onClose={onClose} />);
    handleRoleChange();
    countParticipant();
  };

  return (
    <Modal onClose={onClose}>
      <Container>
        <Box src={itemImg} alt="상품 이미지" />
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

DrawModal.displayName = 'DrawModal';
export default DrawModal;
