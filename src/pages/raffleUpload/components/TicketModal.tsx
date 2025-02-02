import React from 'react';
import Modal from '../../../components/Modal/Modal';
import styled from 'styled-components';
import vector from '../../../assets/Vector.png';

interface ModalProps {
  onClose: () => void;
}

const TicketModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <Container>
        <Img src={vector} />
        <Title>티켓 개수 직접 입력하기</Title>
        <Input placeholder="개" />
        <Button onClick={onClose}>설정하기</Button>
      </Container>
    </Modal>
  );
};

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

const Input = styled.input`
  margin-top: 28px;
  margin-bottom: 152px;
  border-radius: 11px;
  width: 51px;
  height: 37px;
  border: 1px solid #8f8e94;
  display: inline-flex;
  padding: 0px 14px;
  justify-content: center;
  align-items: center;
  &::placeholder {
    transform: translateX(42px);
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  font-family: Pretendard;
`;

const Img = styled.img`
  margin-top: 64px;
  width: 31px;
  height: 30px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default TicketModal;
