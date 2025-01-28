import React from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import questionVector from '../../../assets/questionVector.png';

interface ModalProps {
  onClose: () => void;
}

const NewDrawerModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <Container>
        <Img src={questionVector} />
        <Title>새로운 당첨자를 뽑으시겠습니까?</Title>
        <Short>해당 결정은 번복할 수 없습니다. </Short>
        <Button onClick={onClose}>새로운 당첨자 뽑기</Button>
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

export default NewDrawerModal;
