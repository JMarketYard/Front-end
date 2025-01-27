import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
import vector from '../../../assets/Vector.png';

interface ModalProps {
  onClose: () => void;
}

const DeliverModal: React.FC<ModalProps> = ({ onClose }) => {
  const [deliver, setDliver] = useState('');
  return (
    <Modal onClose={onClose}>
      <Container>
        <Img src={vector} />
        <Title>상품의 운송장을 입력해주세요.</Title>
        <Input
          value={deliver}
          onChange={(event) => setDliver(event.target.value)}
        />
        <Short>
          해당 운송장은 당첨자가 이메일과
          <br /> 알림페이지로 확인할 수 있습니다.
        </Short>
        <Button onClick={onClose}>홈 화면으로 돌아가기</Button>
      </Container>
    </Modal>
  );
};

const Short = styled.div`
  color: #c908ff;
  text-align: center;
  font-family: 'Noto Sans KR';
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  margin-bottom: 100px;
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

const Input = styled.input`
  margin-top: 39px;
  margin-bottom: 20px;
  border-radius: 7px;
  border: 1px solid #000;
  width: 272px;
  height: 31px;
  display: inline-flex;
  padding: 3.2px 14px;
  justify-content: center;
  align-items: center;
  outline: none;
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

export default DeliverModal;
