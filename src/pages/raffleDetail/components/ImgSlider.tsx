import React, { useState } from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import icRight from '../../../assets/raffleDetail/icon-right.svg';
import icLeft from '../../../assets/raffleDetail/icon-left.svg';

interface ItemProps {
  images: string[];
  name: string;
  children?: ReactNode;
}

function ImgSlider({ images, name, children }: ItemProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = (images ?? []).length;
  const lastSlide = totalSlides - 1;
  const totalDots = Math.min(totalSlides, 3);
  const lastDotIndex = totalDots - 1;

  const getActiveDot = () => {
    if (currentSlide === 0) return 0; // 첫 번째 dot 선택
    if (currentSlide === lastSlide) return lastDotIndex; // 마지막 dot 선택
    return totalDots === 2 ? 1 : 1; // 중간 dot 선택
  };

  const settings = {
    centerMode: false,
    dots: true,
    infinite: totalSlides > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    appendDots: () => {
      const totalDots = Math.min(images.length, 3);
      return (
        <CustomDots>
          {Array.from({ length: totalDots }, (_, dotIndex) => (
            <li
              key={dotIndex}
              className={dotIndex === getActiveDot() ? 'active' : ''}
            />
          ))}
        </CustomDots>
      );
    },
    customPaging: () => <button style={{ display: 'none' }} />,
  };

  const GlobalStyle = createGlobalStyle`
  .slick-prev, .slick-next {
    display: none !important;  // 기본 화살표 숨기기
  }
`;

  return (
    <Wrapper>
      <GlobalStyle />
      <ChildrenWrapper>{children}</ChildrenWrapper>
      <Slider {...settings}>
        {(images ?? []).map((image, index) => (
          <ImgContainer key={index}>
            <Img src={image} alt={`${name} - 이미지 ${index + 1}`} />
          </ImgContainer>
        ))}
      </Slider>
    </Wrapper>
  );
}

export default ImgSlider;

const CustomNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <ArrowRight onClick={onClick}>
      <img src={icRight} alt="next" />
    </ArrowRight>
  );
};

const CustomPrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <ArrowLeft onClick={onClick}>
      <img src={icLeft} alt="prev" />
    </ArrowLeft>
  );
};

const Wrapper = styled.div`
  width: 390.582px;
  position: relative;
`;

const CustomDots = styled.ul`
  bottom: -34.43px;
  display: flex;
  justify-content: center;

  li {
    width: 10px;
    height: 10px;
    margin: 0 10px;
    border-radius: 50%;
    background-color: rgba(201, 8, 255, 0.2);
    transition: background-color 0.3s;

    &.active {
      background-color: #c908ff;
    }
  }
`;

const ImgContainer = styled.div`
  width: 390.582px;
  height: 390.582px;
  display: flex;
`;

const ChildrenWrapper = styled.div`
  position: absolute;
  top: 180px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const Img = styled.img.attrs((props) => ({
  src: props.src || '', // 기본 이미지가 없으면 빈 값
}))`
  width: 390.582px;
  height: 390.582px;
  border-radius: 5px;
  background: rgba(228, 228, 228, 0.75);
  justify-content: center;
  align-items: center;
  position: relative;
  background-size: contain;
`;

const ArrowRight = styled.button`
  position: absolute;
  top: 185px;
  right: 14px;
  z-index: 99;
  background: none;
  border: none;
  cursor: pointer;
`;

const ArrowLeft = styled.button`
  position: absolute;
  top: 185px;
  left: 14px;
  z-index: 99;
  background: none;
  border: none;
  cursor: pointer;
`;

const Div = styled.button`
  position: absolute;
  right: 14px;
  z-index: 99;
  text-align: right;
  line-height: 30px;

  &:hover {
    color: #888; /* 호버 시 색상 변경 */
  }
`;

const DivPre = styled.button`
  position: absolute;
  left: 14px;
  z-index: 99;
  text-align: left;
  line-height: 30px;

  &:hover {
    color: #888; /* 호버 시 색상 변경 */
  }
`;
