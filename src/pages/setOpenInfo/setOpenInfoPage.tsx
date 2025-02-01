import styled from "styled-components";
import BigTitle from "../../components/BigTitle";
import { useState } from "react";

const SetOpenInfoPage = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <Wrapper>
    <BigTitle>공개 정보 설정</BigTitle>
    <Container>
      <Box>
        <ToggleBox>
          <RoundDiv />
          <Span>팔로우 목록 공개</Span>
        </ToggleBox>
        <div>
          <Input type="checkbox" id="toggle" />
          <ToggleLabel
          htmlFor="toggle"
          $checked={toggle}
          onClick={()=>setToggle(!toggle)}
          />
        </div>
      </Box>
    </Container>
    </Wrapper>
  );
};

export default SetOpenInfoPage;

const Wrapper = styled.div`
  padding-top: 63px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Container = styled.div`
  padding-top: 63px;
`

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 847px;
`

const RoundDiv = styled.div`
  width: 14px;
  height: 14px;
  background-color: rgba(201, 8, 255, 0.20);
  border-radius: 100%;
  margin-right: 67px;
`

const Span = styled.span`
  display: inline-block;
  width: 200px;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`

const ToggleBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3px;
`

const Input = styled.input`
  display: none;
`

const ToggleLabel = styled.label<{$checked:boolean}>`
  display: flex;
  align-items: center;
  position: relative;
  width: 54px;
  height: 24.856px;
  border-radius: 18px;
  background-color: ${props => props.$checked ? '#C908FF' : '#C1C1C1'};
  box-sizing: border-box;
  cursor: pointer;
  &::before {
    content: "";
    position: absolute;
    top: 2.7px;
    right: 3px;
    width: 20px;
    height: 20px;
    background-color: #FFF;
    border-radius: 100%;
    transition: transform 0.3s ease;
    ${props => props.$checked
      ? 'transform: translateX(-28px)'
      : 'transform: translateX(0)'
    };
  };
  &::after {
    ${props => props.$checked
      ? `content: "ON";
        right: 8px;`
      : `content: "OFF";
        left: 5px`
    };
    position: absolute;
    color: white;
    color: #FFF;
    font-family: Pretendard;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  };
`