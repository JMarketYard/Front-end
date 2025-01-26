import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../../../assets/logo.png';
import EnterModal from './EnterModal';
import Modal from '../../../components/Modal/Modal';
import media from '../../../styles/media';
import { useModalContext } from '../../../components/Modal/context/ModalContext';

interface ModalProps {
  onClose: () => void;
}

const SignupModal: React.FC<ModalProps> = ({ onClose }) => {
  const { openModal } = useModalContext();

  const handleOpenNextModal = () => {
    openModal(({ onClose }) => <EnterModal onClose={onClose} />);
  };

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

  const Content = (
    <Contents>
      <Logo>
        <Img src={logo} />
      </Logo>
      <Container>
        <Line />
        <Info>회원 정보</Info>
        <Name>닉네임</Name>
        <Input placeholder="장마당에서 사용할 닉네임을 입력하세요. (한글 및 영어 2~5자)" />
        <Button onClick={handleOpenNextModal}>회원가입</Button>
      </Container>
    </Contents>
  );

  return isLargeScreen ? <Modal onClose={onClose}>{Content}</Modal> : Content;
};

const Container = styled.div`
  padding-left: 61px;
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
  `}
`;

const Img = styled.img`
  width: 134px;
  height: 63px;
`;

const Button = styled.button`
  margin-top: 145px;
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
  padding-left: 14px;
  width: 273px;
  height: 30px;
  border-radius: 7px;
  border: 1px solid rgba(201, 8, 255, 0);
  background-color: #f7f7f7;
  font-size: 11px;
  &::placeholder {
    font-size: 11px;
    font-style: normal;
    font-weight: 300;
    color: #7d7d7d;
    font-family: Pretendard;
    transform: translateY(1px);
  }
`;

const Name = styled.div`
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 7px;
`;

const Info = styled.div`
  color: #c908ff;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  margin-bottom: 42px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 23px;
`;

const Line = styled.div`
  width: 302px;
  height: 1px;
  background-color: #8f8e94;
  margin-top: 23px;
  margin-bottom: 11px;
`;

export default SignupModal;
