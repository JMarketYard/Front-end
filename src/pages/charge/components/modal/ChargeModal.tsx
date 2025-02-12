import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../../../components/Modal/Modal';
import Checkbox from '@mui/material/Checkbox';
import { Icon } from '@iconify/react';
import CircleChecked from '@mui/icons-material/CheckCircleOutline';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import { PostCharge } from '../../apis/chargeAPI';
import { useMutation } from '@tanstack/react-query';

interface ModalProps {
  onClose: () => void;
  amount: number;
}

const ChargeModal: React.FC<ModalProps> = ({ onClose, amount }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const { mutate: postMutation } = useMutation({
    mutationFn: PostCharge,
    onSuccess: () => {
      console.log('충전 요청 성공');
    },
    onError: (error) => {
      console.log('충전 요청 실패 : ', error);
    },
  });

  const handleNextModal = () => {
    postMutation({
      itemId: '티켓',
      itemName: '테스트상품',
      totalAmount: amount,
    });
  };

  return (
    <Modal onClose={onClose}>
      <Container>
        <Box>
          <Checkbox
            style={{
              transform: 'translateY(0px)',
            }}
            sx={{
              '& .MuiSvgIcon-root': { fontSize: 25 },
              '&.Mui-checked': {
                color: '#C908FF',
              },
            }}
            checked={checked}
            onChange={(event) => {
              event.stopPropagation();
              handleChange(event);
            }}
            icon={<CircleUnchecked />}
            checkedIcon={<CircleChecked />}
          />
          <Consent>
            <span style={{ color: '#C908FF' }}>[필수]</span> 전체동의
          </Consent>
        </Box>
        <CheckBox>
          <Short>상품, 가격, 결제 전 주의사항 확인</Short>
          <Icon
            icon="weui:arrow-outlined"
            style={{
              width: '23px',
              height: '25px',
              cursor: 'pointer',
              color: '#8F8E94',
            }}
          />
        </CheckBox>
        <Button onClick={handleNextModal}>충전하기</Button>
      </Container>
    </Modal>
  );
};

const Consent = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  transform: translateY(1px);
`;

const CheckBox = styled.div`
  display: flex;
  margin-bottom: 48px;
  column-gap: 30px;
  align-items: center;
  transform: translateX(35px);
`;

const Short = styled.div`
  color: #8f8e94;
  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

const Box = styled.div`
  width: 290px;
  height: 43px;
  border: 1px solid #c1c1c1;
  margin-top: 228px;
  margin-bottom: 15px;
  display: flex;
  column-gap: 15px;
  align-items: center;
  padding-left: 10px;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default ChargeModal;
