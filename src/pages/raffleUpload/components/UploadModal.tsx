import React from 'react';
import Modal from '../../../components/Modal/Modal';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  onClose: () => void;
  name: string;
  images: string[];
}

const UploadModal: React.FC<ModalProps> = ({ onClose, name, images }) => {
  const navigate = useNavigate();
  return (
    <Modal onClose={onClose}>
      <Container>
        <Img src={images[0]} />
        <Title>{name}</Title>
        <Short>해당 래플을 업로드하시겠습니까?</Short>
        <Button onClick={()=>navigate('/')}>업로드</Button>
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

const Short = styled.div`
  margin-top: 12px;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 79px;
`;

const Title = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`;

const Img = styled.img`
  width: 190px;
  height: 190px;
  flex-shrink: 0;
  margin-top: 20px;
  margin-bottom: 20px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default UploadModal;
