import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import CircleChecked from '@mui/icons-material/CheckCircleOutline';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import SignupModal from './SignupModal';
import Modal from '../../../components/Modal/Modal';
import { useModalContext } from '../../../components/Modal/context/ModalContext';
import media from '../../../styles/media';
import UnderAgeModal from './UnderAgeModal';

interface ModalProps {
  onClose: () => void;
}

const AgeModal: React.FC<ModalProps> = ({ onClose }) => {
  const [checked, setChecked] = React.useState([false, false]);
  const { openModal } = useModalContext();
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 745 : false,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 745);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, false]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([false, event.target.checked]);
  };

  useEffect(() => {
    console.log('Checked State:', checked);
  }, [checked]);

  const handleOpenNextModal = () => {
    if (checked[0]) {
      openModal(({ onClose }) => <SignupModal onClose={onClose} />);
    } else if (checked[1]) {
      openModal(({ onClose }) => <UnderAgeModal onClose={onClose} />);
    } else {
      return;
    }
  };

  const Content = (
    <Contents>
      {' '}
      <Container>
        <NewOption>
          <Circle />
          <Title>최소 연령 확인</Title>
        </NewOption>
        <Line />
        <Option style={{ marginBottom: '26px' }}>
          <Checkbox
            checked={checked[0]}
            onChange={handleChange1}
            icon={<CircleUnchecked />}
            checkedIcon={<CircleChecked />}
            sx={{
              '& .MuiSvgIcon-root': { fontSize: 14 },
              '&.Mui-checked': {
                color: '#C908FF',
              },
            }}
          />
          <Short>만 14세 이상입니다.</Short>
        </Option>
        <Option>
          <Checkbox
            checked={checked[1]}
            onChange={handleChange2}
            icon={<CircleUnchecked />}
            checkedIcon={<CircleChecked />}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 14,
              },
              '&.Mui-checked': {
                color: '#C908FF',
              },
            }}
          />
          <Short>만 14세 미만입니다.</Short>
        </Option>
        <Button onClick={handleOpenNextModal}>계속하기</Button>
      </Container>
    </Contents>
  );
  return isLargeScreen ? <Modal onClose={onClose}>{Content}</Modal> : Content;
};
const Contents = styled.div`
  ${media.notLarge`
    background-color: white;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    position: fixed; 
    top: 0;
    left: 0;
  `}
`;

const Container = styled.div`
  padding-left: 61px;
`;

const Circle = styled.div`
  width: 14px;
  height: 14px;
  background-color: #c908ff;
  border: 0;
  border-radius: 100%;
`;

const Button = styled.button`
  margin-top: 77px;
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

const Line = styled.div`
  width: 302px;
  height: 1px;
  background: #8f8e94;
  margin-top: 35px;
  margin-bottom: 34px;
`;

const Short = styled.div`
  color: #000000;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

const NewOption = styled.div`
  display: flex;
  column-gap: 39px;
  align-items: center;
  margin-top: 127px;
`;

const Option = styled.div`
  display: flex;
  column-gap: 35px;
  align-items: center;
`;

const Title = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`;

export default AgeModal;
