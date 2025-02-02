import React, { useState } from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { ReactComponent as Next } from "../../assets/next.svg";
// import { ReactComponent as Prev } from "../../assets/prev.svg";

interface ItemProps {
  images: string[];
  name: string;
  children?: ReactNode;
}

function ImgSlider({ images, name, children }: ItemProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;
  const lastSlide = totalSlides - 1;

  const getActiveDot = () => {
    if (currentSlide === 0) return 0; // 첫 번째 dot 선택
    if (currentSlide === lastSlide) return 2; // 마지막 dot 선택
    return 1; // 중간 dot 선택
  };

  const settings = {
    rows: 1,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <Div />,
    prevArrow: <DivPre />,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    appendDots: () => (
      <CustomDots>
        {[0, 1, 2].map((dotIndex) => (
          <li
            key={dotIndex}
            className={dotIndex === getActiveDot() ? 'active' : ''}
          />
        ))}
      </CustomDots>
    ),
    customPaging: () => <button style={{ display: 'none' }} />,
  };
  return (
    <Wrapper>
      <ChildrenWrapper>{children}</ChildrenWrapper>
      <Slider {...settings}>
        {images.map((image, index) => (
          <ImgContainer key={index}>
            <Img src={image} alt={`${name} - 이미지 ${index + 1}`} />
          </ImgContainer>
        ))}
      </Slider>
    </Wrapper>
  );
}

export default ImgSlider;

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
`;

const Div = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 16px;
  z-index: 99;
  text-align: right;
  line-height: 30px;
`;
const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 16px;
  z-index: 99;
  text-align: left;
  line-height: 30px;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px; /* 화살표 크기 조절 */
  font-weight: bold;
  color: #c1c1c1; /* 피그마 stroke 색상 적용 */
  width: 11.836px;
  height: 27.976px;
  flex-shrink: 0;
  stroke-width: 2px;

  &:hover {
    color: #888; /* 호버 시 색상 변경 */
  }
`;
