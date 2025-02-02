import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import CircleChecked from '@mui/icons-material/CheckCircleOutline';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import AgeModal from './AgeModal';
import Modal from '../../../components/Modal/Modal';
import media from '../../../styles/media';
import { useModalContext } from '../../../components/Modal/context/ModalContext';

interface ModalProps {
  onClose: () => void;
}

const ConsentModal: React.FC<ModalProps> = ({ onClose }) => {
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
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const handleOpenNextModal = () => {
    if (checked[0] && checked[1]) {
      openModal(({ onClose }) => <AgeModal onClose={onClose} />);
    } else {
      return;
    }
  };

  const Content = (
    <Contents>
      <Container>
        {/* <img src={logo}/> */}
        <Option>
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
            checked={checked[0] && checked[1]}
            onChange={(event) => {
              event.stopPropagation();
              handleChange1(event);
            }}
            icon={<CircleUnchecked />}
            checkedIcon={<CircleChecked />}
          />
          <Title>모두 동의</Title>
        </Option>
        <Line />
        <Option style={{ marginBottom: '22px' }}>
          <Checkbox
            checked={checked[0]}
            onChange={(event) => {
              event.stopPropagation();
              handleChange2(event);
            }}
            icon={<CircleUnchecked />}
            checkedIcon={<CircleChecked />}
            sx={{
              '& .MuiSvgIcon-root': { fontSize: 21 },
              '&.Mui-checked': {
                color: '#C908FF',
              },
            }}
          />
          <Short>(필수) 필드 약관 및 동의사항</Short>
          <Arrow>&gt;</Arrow>
        </Option>
        <Option>
          <Checkbox
            checked={checked[1]}
            onChange={(event) => {
              event.stopPropagation();
              handleChange3(event);
            }}
            icon={<CircleUnchecked />}
            checkedIcon={<CircleChecked />}
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 21,
              },
              '&.Mui-checked': {
                color: '#C908FF',
              },
            }}
          />
          <Short>(필수) 마케팅 정보 수신 동의</Short>
          <Arrow>&gt;</Arrow>
        </Option>
        <Button onClick={handleOpenNextModal}>계속하기</Button>
      </Container>
    </Contents>
  );

  return isLargeScreen ? <Modal onClose={onClose}>{Content}</Modal> : Content;
};

const Arrow = styled.div`
  width: 8px;
  height: 17px;
  stroke-width: 1px;
  stroke: #8f8e94;
  color: #8f8e94;
`;

const Contents = styled.div`
  ${media.notLarge`
    background-color: white;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    position: fixed; 
    top: 0;
    left: 0;
    display: flex;
  align-items: center;
  justify-content: center;
  `}
`;

const Container = styled.div`
  padding-top: 112px;
  padding-left: 61px;
`;

const Button = styled.button`
  margin-top: 73px;
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
  margin-top: 25px;
  margin-bottom: 32px;
`;

const Short = styled.div`
  color: #8f8e94;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

const Option = styled.div`
  display: flex;
  column-gap: 28px;
  align-items: center;
`;

const Title = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`;

export default ConsentModal;
