import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function AdBanner() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: 'linear',
  };

  return (
    <SliderWrapper>
      <Slider {...settings}>
        <div>
          <AdBox>1</AdBox>
        </div>
        <div>
          <AdBox>2</AdBox>
        </div>
        <div>
          <AdBox>3</AdBox>
        </div>
      </Slider>
    </SliderWrapper>
  );
}

const SliderWrapper = styled.div`
  max-width: 1920px; /* 원하는 슬라이더 크기 설정 */
  margin: 0 auto; /* 중앙 정렬 */
  padding: 50px 0; /* 슬라이더 상하 간격 */
  display: flex;

  .slick-slide {
    padding: 0 40px; /* 슬라이드 간격 */
  }
`;

const AdBox = styled.div`
  width: 780px;
  height: 454px;
  background-color: #e7e7e7;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default AdBanner;
