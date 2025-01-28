import React from 'react';
import Modal from '../Modal';
import styled from 'styled-components';
import ticket from '../../../assets/ticket.svg';

interface ModalProps {
  onClose: () => void;
}

const DrawFailModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <Container>
        <Box />
        <Title>로지텍 무소음 마우스</Title>
        <Short>응모 실패! 티켓이 부족합니다.</Short>
        <TicketBox>
          <Text>부족한 티켓 개수 : </Text>
          <Img src={ticket} />
          <Ticket>3</Ticket>
        </TicketBox>
        <Button onClick={onClose}>응모하기</Button>
      </Container>
    </Modal>
  );
};

const Text = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
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
  margin-top: 10px;
  color: #ff008c;
  text-align: center;
  font-family: Pretendard;
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

const Box = styled.div`
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

export default DrawFailModal;
