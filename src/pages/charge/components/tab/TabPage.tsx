import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ticketIcon from '../../../../assets/ticket.svg';
import { Icon } from '@iconify/react';
import { useModalContext } from '../../../../components/Modal/context/ModalContext';
import ChangeModal from '../modal/ChangeModal';

interface TabTypeProps {
  type: number;
}

function TabPage({ type }: TabTypeProps) {
  const [ticket, setTicket] = useState<string>('');
  const { openModal } = useModalContext();

  useEffect(() => {
    console.log(ticket);
  }, [ticket]);

  const handleNextModal = () => {
    openModal(({ onClose }) => <ChangeModal onClose={onClose} />);
  };

  return (
    <Container>
      <Short>{type === 0 ? '충전할 응모 티켓' : '환전할 응모 티켓'}</Short>
      <TicketContainer>
        <InputContainer>
          <Img src={ticketIcon} />
          <Input
            value={ticket ?? ''}
            onChange={(event) => setTicket(event.target.value)}
            type="number"
          />
          <Icon
            icon={'ei:close-o'}
            style={{
              width: '25px',
              height: '25px',
              color: '#7D7D7D',
              transform: 'translateX(-14px)',
            }}
            onClick={() => setTicket('')}
          />
        </InputContainer>
        개
      </TicketContainer>
      <TicketContainer
        style={{ marginTop: '15px', transform: 'translateX(-25px)' }}
      >
        <Button
          onClick={() => {
            setTicket((prev) => (Number(prev) + 10).toString());
          }}
        >
          + 10개
        </Button>
        <Button
          onClick={() => {
            setTicket((prev) => (Number(prev) + 100).toString());
          }}
        >
          + 100개
        </Button>
        <Button
          onClick={() => {
            setTicket((prev) => (Number(prev) + 1000).toString());
          }}
        >
          + 1000개
        </Button>
      </TicketContainer>
      {type === 0 ? (
        <KakaoButtons>
          <Icon
            icon="raphael:bubble"
            style={{
              width: '15px',
              height: '13px',
              color: 'black',
            }}
          />
          <Kakao>카카오페이로 결제하기</Kakao>
        </KakaoButtons>
      ) : (
        <ChangeButton onClick={handleNextModal}>환전하기</ChangeButton>
      )}
      <Option>
        <div>{type === 0 ? '충전 후 티켓' : '환전 후 티켓'}</div>
        <div>500개</div>
      </Option>
      <Line />
      <Option>
        <div>{type === 0 ? '티켓 금액' : '입금 받을 금액'}</div>
        <div>30,000원</div>
      </Option>
      <Line />
      <div
        style={{ width: '400px', display: 'flex', justifyContent: 'flex-end' }}
      >
        <Info>환전 시 등록된 계좌로 정산됩니다.</Info>
      </div>
    </Container>
  );
}

const Info = styled.div`
  color: #c908ff;
  text-align: right;
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
`;

const ChangeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 193px;
  height: 36px;
  border-radius: 7px;
  border: 0;
  background-color: #c908ff;
  color: white;
  margin-bottom: 125px;
  margin-top: 72px;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  transform: translateX(-20px);
`;

const Line = styled.div`
  border-top: 2px dashed gray;
  width: 402px;
  height: 2px;
  margin-top: 11px;
  margin-bottom: 15px;
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  color: #8f8e94;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 17.308px;
  width: 375px;
  height: 20px;
`;

const KakaoButtons = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 193px;
  height: 36px;
  border-radius: 7px;
  border: 0;
  background-color: #fbe44e;
  color: black;
  margin-bottom: 125px;
  margin-top: 72px;
  column-gap: 10px;
  transform: translateX(-20px);
`;

const Kakao = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transform: translateY(1px);
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
`;

const Button = styled.button`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 37px;
  padding: 0px 14px;

  background-color: white;
  color: #8f8e94;
  border-radius: 8px;
  border: 1px solid #8f8e94;

  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
`;

const Input = styled.input`
  outline: none;
  border: none;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  width: 223px;
  margin-right: 15px;
  transform: translateY(2px);
`;

const Img = styled.img`
  width: 29.81px;
  height: 19.562px;
  margin-right: 19px;
`;

const InputContainer = styled.div`
  width: 319px;
  height: 49px;
  border-radius: 8px;
  border: 1px solid #000;
  display: flex;
  padding-left: 16px;
  align-items: center;
`;

const Short = styled.div`
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 17.308px;
  margin-bottom: 8px;
  width: 349px;
  display: flex;
  justify-content: flex-start;
`;

const TicketContainer = styled.div`
  display: flex;
  column-gap: 13px;
  align-items: center;
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`;

const Container = styled.div`
  width: 858px;
  height: auto;
  display: flex;
  align-items: center;
  padding-top: 86px;
  flex-direction: column;
`;

export default TabPage;
