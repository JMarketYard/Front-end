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
  const [isError, setIsError] = useState('');
  const [name, setName] = useState('');

  const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleOpenNextModal = () => {
    if (!regex.test(name)) {
      setIsError('닉네임은 2~10자의 한글 또는 영어만 사용 가능합니다.');
      return;
    } else {
      setIsError('');
      openModal(({ onClose }) => <EnterModal onClose={onClose} />);
    }
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
        <Box>
          <Name>닉네임</Name>
          <Error>{isError}</Error>
        </Box>
        <Input
          isError={!!isError}
          value={name}
          onChange={handleChangeName}
          placeholder="장마당에서 사용할 닉네임을 입력하세요. (한글 및 영어 2~5자)"
        />
        <Button disabled={!name} onClick={handleOpenNextModal}>
          회원가입
        </Button>
      </Container>
    </Contents>
  );

  return isLargeScreen ? <Modal onClose={onClose}>{Content}</Modal> : Content;
};

const Box = styled.div`
  display: flex;
  column-gap: 28px;
  margin-bottom: 7px;
`;

const Error = styled.div`
  width: 234px;
  height: 17px;
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: #c908ff;
  font-family: 'Noto Sans KR';
  transform: translateX(-18px);
`;

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

const Input = styled.input<{ isError: boolean }>`
  padding-left: 14px;
  width: 273px;
  height: 30px;
  border-radius: 7px;
  border: ${({ isError }) => (isError ? '1px solid #C908FF' : 'none')};
  background-color: #f7f7f7;
  font-size: 11px;
  outline: none;
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
