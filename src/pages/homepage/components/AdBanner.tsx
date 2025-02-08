import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import media from '../../../styles/media';

function AdBanner() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 4000,
    centerMode: true,
    centerPadding: '20%',
    cssEase: 'ease',
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default AdBanner;

const Wrapper = styled.div`
  width: 1440px;
  height: 396px;
  margin: 39px auto 61px auto;
  box-sizing: content-box;
  overflow: hidden;
  background-color: white;

  .slick-slide {
    width: 1440px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-dots {
    bottom: -27px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 8px;

    .slick-active button::before {
      color: #c908ff; /* 선택된 점의 색상 */
      font-size: 8px;
    }

    button::before {
      color: rgba(201, 8, 255, 0.2); /* 선택되지 않은 점의 색상 */
      font-size: 8px;
    }
  };
  ${media.medium`
      margin-top: 26px;
    `}
`;

const AdBox = styled.a`
  width: 825px;
  height: 369px;
  flex-shrink: 0;
  margin: 0 23px;
  border-radius: 31px;
  background: #e7e7e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;
