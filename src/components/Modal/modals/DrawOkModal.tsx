import React from 'react';
import Modal from '../Modal';
import styled from 'styled-components';
import ticket from '../../../assets/ticket.svg';

interface ModalProps {
  onClose: () => void;
  resultTime: string;
  image: string;
}

const DrawOkModal: React.FC<ModalProps> = ({ onClose, resultTime, image }) => {
  const formatDate = (isoString: string) =>
    new Date(isoString).toLocaleString('ko-KR', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      hour12: false,
      year: undefined,
    });
  //메일로 결과가 전송됩니다. 수정하기!
  return (
    <Modal onClose={onClose}>
      <Container>
        <TicketBox>
          <Img src={ticket} />
          <Ticket>응모 완료!</Ticket>
        </TicketBox>
        <Short>메일로 결과가 전송됩니다.</Short>
        <Box src={image} alt="상품 이미지" />
        <Button onClick={onClose}>내가 응모한 게시물 보러가기기</Button>
      </Container>
    </Modal>
  );
};

const Ticket = styled.div`
  color: #c908ff;
  text-align: center;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
`;

const TicketBox = styled.div`
  display: flex;
  column-gap: 13px;
  margin-top: 39px;
`;

const Img = styled.img`
  width: 28.952px;
  height: 19px;
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
  font-family: 'Noto Sans KR';
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 40px;
  margin-bottom: 42px;
`;

const Box = styled.img`
  width: 155px;
  height: 155px;
  flex-shrink: 0;
  background: #d9d9d9;
  margin-bottom: 94px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default DrawOkModal;
