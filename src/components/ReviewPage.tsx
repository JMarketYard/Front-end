import React from "react";
import styled from "styled-components";
import StarIcon from "../assets/mypages/Star.svg";
import GrayStarIcon from "../assets/mypages/Graystar.svg";

const ReviewPage: React.FC = () => {
  const averageRating = 5.0;
  const totalReviews = 50;

  const reviews = [
    {
      id: 1,
      username: "이유진",
      rating: 4,
      product: "다영이언니의 텀블러",
      reviewText:
        "멋진 텀블러 잘 받았습니다! 주최자분께서 올려주신 사진과 동일합니다. 다만 배송이 조금 늦었네요. 반성하세요!",
      images: ["/image1.jpg", "/image2.jpg", "/image3.jpg"],
    },
    {
      id: 2,
      username: "닉네임",
      rating: 4,
      product: "다영이언니의 텀블러",
      reviewText:
        "멋진 텀블러 잘 받았습니다! 주최자분께서 올려주신 사진과 동일합니다. 다만 배송이 조금 늦었네요. 반성하세요!",
      images: ["/image4.jpg", "/image5.jpg", "/image6.jpg"],
    },
  ];

  return (
    <Container>
      <AverageRatingBox>
        <StarRow>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} src={StarIcon} />
          ))}
        </StarRow>
        <RatingText>
          평점: <RatingValue>{averageRating.toFixed(1)}</RatingValue> ({totalReviews})
        </RatingText>
      </AverageRatingBox>

      {reviews.map((review) => (
        <ReviewCard key={review.id}>
          <UserSection>
            <ProfileImage />
            <Username>{review.username}</Username>
            <StarRow>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} src={index < review.rating ? StarIcon : GrayStarIcon} />
              ))}
            </StarRow>
          </UserSection>

          <ReviewContent>
            <ProductName>{review.product}</ProductName>
            <ImageContainer>
              {review.images.map((image, index) => (
                <ReviewImage key={index} src={image} alt={`Review ${index + 1}`} />
              ))}
            </ImageContainer>
            <ReviewText>{review.reviewText}</ReviewText>
          </ReviewContent>
        </ReviewCard>
      ))}
    </Container>
  );
};

export default ReviewPage;


const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  padding: 40px 20px; 
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px; 
`;

const AverageRatingBox = styled.div`
  width: 206px;
  height: 94px;
  text-align: center;
  margin: 0 auto 30px;
`;

const StarRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`;

const Star = styled.img`
  width: 24px;
  height: 24px;
`;

const RatingText = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const RatingValue = styled.span`
  color: #c908ff;
`;

const ReviewCard = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 14px;
  background: rgba(245, 245, 245, 0.79);
  margin-bottom: 20px;
`;

const UserSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProfileImage = styled.div`
  width: 62px;
  height: 61px;
  border-radius: 50%;
  background: #d9d9d9;
  margin-bottom: 10px;
`;

const Username = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 8px;
`;

const ReviewContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-left: 20px;
`;

const ProductName = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #8f8e94;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ReviewImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 5px;
  background: #d9d9d9;
  object-fit: cover;
`;

const ReviewText = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #000;
  line-height: 150%;
`;
