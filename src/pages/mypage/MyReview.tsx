import React from "react";
import styled from "styled-components";
import BigTitle from "../../components/BigTitle";
import ReviewPage from "../../components/ReviewPage"; // 방금 만든 리뷰 컴포넌트

const MyReview: React.FC = () => {
  return (
    <Container>
      <TitleWrapper>
        <BigTitle>내 상점 후기</BigTitle>
      </TitleWrapper>
      <ReviewWrapper>
        <ReviewPage />
      </ReviewWrapper>
    </Container>
  );
};

export default MyReview;
const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  z-index: 10;
  padding: 20px;
  background: rgba(255, 255, 0, 0.2); /* 임시로 배경 적용 */
`;


const ReviewWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
