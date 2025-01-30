import React from "react";
import StarRating from './components/StarRating'

const App: React.FC = () => {
  const handleRatingChange = (rating: number) => {
    console.log("Rating changed:", rating);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Star Rating Demo</h1>
      <StarRating totalStars={5} initialRating={3} onRatingChange={handleRatingChange} />
    </div>
  );
};

export default App;

