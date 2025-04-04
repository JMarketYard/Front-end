import React, { useState } from 'react';
import { ReactNode } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import icRight from '../../../assets/raffleDetail/icon-right.svg';
import icLeft from '../../../assets/raffleDetail/icon-left.svg';
import media from '../../../styles/media';

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
    if (currentSlide === 0) return 0;
    if (currentSlide === lastSlide) return lastDotIndex;
    return totalDots === 2 ? 1 : 1;
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
      display: none !important;
    }
  `;

  return (
    <Wrapper>
      <GlobalStyle />
      <Slider {...settings}>
        {(images ?? []).map((image, index) => (
          <ImgContainer key={index}>
            <Img src={image} alt={`${name} - 이미지 ${index + 1}`} />
            <Overlay>{children}</Overlay> {/* ✅ 이미지 위에 덮임 */}
          </ImgContainer>
        ))}
      </Slider>
    </Wrapper>
  );
}

export default ImgSlider;

// 👇 custom arrows 그대로 유지
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
  ${media.medium`
    width: 307px;
  `};
`;

const ImgContainer = styled.div`
  position: relative; /* ✅ 기준 부모 설정 */
  width: 390.582px;
  height: 390.582px;
  display: flex;

  ${media.medium`
    width: 307px;
    height: 307px;
  `}
`;

const Overlay = styled.div`
  position: absolute; /* ✅ 이미지 위 덮기 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none; // 클릭 막고 싶으면 유지
`;

const Img = styled.img`
  width: 390.582px;
  height: 390.582px;
  border-radius: 5px;
  background: #f7f7f7;
  object-fit: contain;
  ${media.medium`
    width: 307px;
    height: 307px;
  `}
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
