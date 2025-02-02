import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { useModalContext } from '../context/ModalContext';
import Slider from 'react-slick';

interface Item {
  id: number;
  name: string;
}

export default function RandomModal({
  onClose,
}: PropsWithChildren<{ onClose: () => void }>) {
  const { clearModals } = useModalContext();
  const sliderRef = useRef<Slider | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [winner, setWinner] = useState<string>('');
  const [isRolling, setIsRolling] = useState(false);

  const data = [
    { id: 0, name: '안제웅' },
    { id: 1, name: '닉네임' },
    { id: 2, name: '김예린' },
    { id: 3, name: '김철수' },
    { id: 4, name: '박영희' },
    { id: 5, name: '이민호' },
    { id: 6, name: '정하나' },
    { id: 7, name: '최준혁' },
    { id: 8, name: '이서준' },
    { id: 9, name: '박민지' },
    { id: 10, name: '손영호' },
    { id: 11, name: '한수민' },
    { id: 12, name: '배지훈' },
    { id: 13, name: '이유진' },
    { id: 14, name: '송하영' },
    { id: 15, name: '오지훈' },
    { id: 16, name: '강도윤' },
    { id: 17, name: '김다현' },
    { id: 18, name: '정민호' },
    { id: 19, name: '유진서' },
    { id: 20, name: '이승연' },
    { id: 21, name: '박서윤' },
    { id: 22, name: '한지민' },
    { id: 23, name: '조윤아' },
    { id: 24, name: '서현우' },
    { id: 25, name: '배윤지' },
    { id: 26, name: '고민수' },
    { id: 27, name: '김한별' },
    { id: 28, name: '신지훈' },
    { id: 29, name: '차민준' },
  ];

  useEffect(() => {
    setItems(data);
    setWinner('강도윤');
  }, []);

  const handleClick = () => {
    if (!isRolling && winner && sliderRef.current) {
      setIsRolling(true);
      sliderRef.current.slickPlay();

      setTimeout(() => {
        const winnerIndex = items.findIndex((item) => item.name === winner) - 1;
        if (winnerIndex !== -1) {
          sliderRef.current?.slickGoTo(winnerIndex);
          setTimeout(() => sliderRef.current?.slickPause(), 500);
        }
        setIsRolling(false);
      }, 500);

    }
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: false,
    arrows: false,
    speed: 600,
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClick={clearModals}>
      <ModalContent
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Icon
            icon={'ei:close-o'}
            style={{
              width: '30px',
              height: '30px',
              color: '#FFFFFF',
              transform: 'translateX(-14px)',
            }}
            onClick={onClose}
          />
        </div>
        <ContainerBox onClick={(e) => e.stopPropagation()}>
          <Container>
            <Slider ref={sliderRef} {...settings}>
              {items.map((item) => (
                <List key={item.id}>{item.name}</List>
              ))}
            </Slider>
            <Border />
          </Container>
          <Button onClick={handleClick}>Draw</Button>
        </ContainerBox>
      </ModalContent>
    </ModalOverlay>,
    document.getElementById('modal-root') as HTMLElement,
  );
}

const List = styled.div`
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  height: 60px;
`;

const Border = styled.div`
  width: 229px;
  height: 60px;
  border-radius: 12px;
  border: 2px solid #faff00;
  background-color: transparent;
  position: absolute;
  top: 52px;
`;

const Button = styled.button`
  width: 302px;
  height: 39px;
  border-radius: 7px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c908ff;
  border: none;

  font-family: Pretendard;
  font-size: 14px;
  font-weight: 700;
  line-height: 18px;
`;

const ContainerBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Container = styled.div`
  margin-top: 65px;
  height: 190px;
  width: 232px;
  margin-bottom: 100px;
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 25px;
  color: #fff;
  justify-content: center;

  text-align: center;
  font-family: Pretendard;
  font-size: 25px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  overflow: hidden;
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  display: flex;
  position: relative;
  width: 425px;
  height: auto;
  flex-direction: column;
  background-color: #c908ff;
  border-radius: 6px;
  padding-top: 14px;
  padding-bottom: 58px;
`;
