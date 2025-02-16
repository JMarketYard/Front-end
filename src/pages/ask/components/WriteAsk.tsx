import styled from "styled-components";

const WriteAsk = () => {
  return (
    <Container>
      <TitleContainer>
        <Text>제목</Text>
        <TitleBox>
          <Input />
        </TitleBox>
      </TitleContainer>
      <ContentsContainer>
        <Text>내용</Text>
        <Textarea />
      </ContentsContainer>
      <Button>문의하기</Button>
    </Container>
  )
}

export default WriteAsk;

const Container = styled.div`
  // padding-left: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 44px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  display: inline-block;
  width: 35px;
  margin-right: 76px;
  
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36.832px; /* 184.159% */
`;

const TitleBox = styled.div`
  width: 747px;
  height: 45px;
  border-radius: 7px;
  border: 1px solid #8F8E94;
  background: #F5F5F5;
  padding: 0 8px;
  box-sizing: border-box;
`;
const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  width: 100%;

  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 36.832px; /* 184.159% */
`

const ContentsContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Textarea = styled.textarea`
  width: 747px;
  height: 328px;
  border-radius: 7px;
  border: 1px solid #8F8E94;
  background: #F5F5F5;
  resize: none;
  padding: 0 8px;
  box-sizing: border-box;
  outline: none;

  color: #000;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 36.832px; /* 184.159% */
`;

const Button = styled.button`
  width: 424px;
  height: 57px;
  border-radius: 7px;
  background: #C908FF;
  border: none;
  margin: 60px 0 50px;

  color: #FFF;
  text-align: center;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px; /* 81.818% */
  letter-spacing: -0.165px;

  &:hover {
    cursor: pointer;
  };
`