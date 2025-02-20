import styled from "styled-components";
import BigTitle from "../../components/BigTitle";
import { useState } from "react";
import media from "../../styles/media";
import axiosInstance from "../../apis/axiosInstance";

const SetOpenInfoPage = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    const patchInfo = async () => {
      await axiosInstance.patch('/api/member/mypage/secretInfo', toggle,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )
      .then(_=>console.log("setToggle 전:", toggle))
      .then(_=>setToggle(!toggle))
      .then(_=>console.log("PATCH 성공, 현재 toggle 상태:", toggle))
      .catch(error=>console.error(error));
    };
    patchInfo();
  };
  return (
    <Wrapper>
    <BigTitle>공개 정보 설정</BigTitle>
    <Container>
      <Box>
        <ToggleBox>
          <RoundDiv />
          <Span>팔로워 수 공개</Span>
        </ToggleBox>
        <div>
          <Input type="checkbox" id="toggle" />
          <ToggleLabel
          htmlFor="toggle"
          $checked={toggle}
          onClick={handleToggle}
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

  ${media.medium`
    width: 628px;
  `}
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
    left: ${(props) => (props.$checked ? "2px" : "calc(100% - 22px)")};
    transition: left 0.3s ease;
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