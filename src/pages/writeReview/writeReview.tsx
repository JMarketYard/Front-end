import styled from "styled-components";
import BigTitle from "../../components/BigTitle";
import StarRating from "../../components/StarRating";
import media from "../../styles/media";

const WriteReview = () => {
  return (
    <>
    <Wrapper>
      <BigTitle>후기 남기기</BigTitle>
      <ScoreBox>
        <TextBox>평점 매기기:</TextBox>
        <StarRating />
      </ScoreBox>
      <Textarea placeholder="후기는 1~100자로 입력해주세요." />
      <Button>작성 완료</Button>
    </Wrapper>
    </>
  );
};

export default WriteReview;

const Wrapper = styled.form`
  padding-top: 63px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ScoreBox = styled.div`
  display: flex;
  align-items: center;
  padding-top: 73px;
  margin-bottom: 65px;
`
const TextBox = styled.div`
  color: #8F8E94;
  text-align: center;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-right: 28px;
`

const Textarea = styled.textarea`
  width: 866px;
  height: 497px;
  padding: 10px;
  margin-bottom: 137px;
  border: 1px solid #8F8E94;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  resize: none;
  
  ${media.medium`
    width: 658px;
  `}
`

const Button = styled.button`
  width: 424px;
  height: 57px;
  border-radius: 7px;
  border: none;
  background: #C908FF;
  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px; /* 81.818% */
  letter-spacing: -0.165px;
  margin-bottom: 167px;
  &:hover {
    cursor: pointer;
  }
`