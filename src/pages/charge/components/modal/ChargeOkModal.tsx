import React from 'react';
import Modal from '../../../../components/Modal/Modal';
import styled from 'styled-components';
import vector from '../../../../assets/Vector.png';
import { useModalContext } from '../../../../components/Modal/context/ModalContext';

interface ModalProps {
  onClose: () => void;
}

const ChargeOkModal: React.FC<ModalProps> = ({ onClose }) => {
  const { clearModals } = useModalContext();

  return (
    <Modal onClose={onClose}>
      <Container>
        <Img src={vector} />
        <Title>티켓 환전 완료!</Title>
        <Option>
          <Name>거래 날짜</Name>
          <Name>2024.01.20</Name>
        </Option>
        <Line />
        <Option>
          <Sname>적용 수수료</Sname>
          <Sname>7%</Sname>
        </Option>
        <Option>
          <Sname>사용한 티켓</Sname>
          <Sname>300개</Sname>
        </Option>
        <Option>
          <Name>입금 받은 금액</Name>
          <Price>30,000원</Price>
        </Option>
        <Option>
          <div></div>
          <Sname style={{ color: '#C908FF' }}>잔여 티켓: 500개</Sname>
        </Option>
        <Button onClick={clearModals}>홈 화면으로 돌아가기</Button>
      </Container>
    </Modal>
  );
};

const Button = styled.button`
  margin-top: 65px;
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

const Price = styled.div`
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
`;

const Sname = styled.div`
  color: #8f8e94;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

const Line = styled.div`
  width: 275px;
  height: 1px;
  margin-bottom: 9px;
  background: #000;
`;

const Name = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

const Option = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 9px;
  width: 265px;
`;

const Title = styled.div`
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 50px;
`;

const Img = styled.img`
  margin-top: 29px;
  width: 33px;
  height: 33px;
  margin-bottom: 25px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default ChargeOkModal;
