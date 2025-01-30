import React, { useState } from "react";
import styled from "styled-components";
import { Star as StarIcon } from "lucide-react";

interface StarRatingProps {
  totalStars?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
}

const BackgroundContainer = styled.div`
  background-color: #f7f7f7;
  width: 807.73px;
  height: 251.63px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 4px; /* Reduced gap to make stars closer */
`;

const StyledStar = styled.div<{ filled: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 94.96px; /* Explicitly setting the size of the SVG icon */
    height: 99.25px;
    color: ${(props) => (props.filled ? "#facc15" : "#d1d5db")};
  }
`;

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  initialRating = 0,
  onRatingChange,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleRating = (index: number) => {
    let newRating = rating;
    if (index + 1 === rating) {
      newRating = index; // Remove the last selected star
    } else if (index < rating) {
      newRating = index; // Remove the clicked star
    } else {
      newRating = index + 1; // Add a star
    }

    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <BackgroundContainer>
      <StarContainer>
        {Array.from({ length: totalStars }, (_, index) => (
          <StyledStar
            key={index}
            filled={index < rating}
            onClick={() => handleRating(index)}
          >
            <StarIcon fill={index < rating ? "#facc15" : "none"} stroke="#facc15" />
          </StyledStar>
        ))}
      </StarContainer>
    </BackgroundContainer>
  );
};

export default StarRating;
