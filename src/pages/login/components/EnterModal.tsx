import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import vector from '../../../assets/Vector.png';
import Modal from '../../../components/Modal/Modal';
import media from '../../../styles/media';

interface ModalProps {
  onClose: () => void;
}

const EnterModal: React.FC<ModalProps> = ({ onClose }) => {
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
      <Container>
        <Img src={vector} />
        <Title>장마당에 오신 것을 환영합니다.</Title>
        <Line />
        <Describe>
          장마당에서는 중고물품을 ‘응모’ 기반에 {'\n'}판매하고, 구매할 수 있는
          서비스를 제공{'\n'}합니다. 여러분께 즐거운 판매 기회와 {'\n'}득템의
          기회를 제공하기 위해 최선을 {'\n'}다하겠습니다.
        </Describe>
        <Button>장마당 입장하기</Button>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 39px;
`;

const Img = styled.img`
  width: 31px;
  height: 31px;
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

const Describe = styled.div`
  color: #7d7d7d;
  text-align: center;
  font-family: Pretendard;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  white-space: pre-line;
  margin-bottom: 105px;
`;

const Line = styled.div`
  width: 204px;
  height: 1px;
  background: #d9d9d9;
  margin-bottom: 32px;
`;

const Title = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 31px;
  margin-top: 25px;
`;

export default EnterModal;
