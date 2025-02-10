import React, { useState } from "react";
import styled from "styled-components";
import BigTitle from "../../components/BigTitle";
import SmallTitle from "../../components/SmallTitle";

const PublicInformationSet: React.FC = () => {
  const [isPublic, setIsPublic] = useState<boolean>(true);

  const handleToggle = () => setIsPublic((prev) => !prev);

  return (
    <Container>
      <BigTitle>공개 정보 설정</BigTitle>
      <SmallTitleBox>
        <SmallTitle>팔로우 목록 공개</SmallTitle>
        <ToggleWrapper onClick={handleToggle} isActive={isPublic}>
          <ToggleThumb isActive={isPublic} />
        </ToggleWrapper>
      </SmallTitleBox>
    </Container>
  );
};

export default PublicInformationSet;

/* ✅ 스타일 */
const Container = styled.div`
  background: white;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  text-align: center;
  margin-top: 64px;
  padding: 20px;
`;

const SmallTitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 66px;
  padding-left:112px;
  padding-right:112px;
  font-size: 16px;
  line-height: 1.5;
`;

const ToggleWrapper = styled.div<{ isActive: boolean }>`
  width: 54px;
  height: 25px;
  border-radius: 14px;
  background: ${(props) => (props.isActive ? "#C908FF" : "#CCC")};
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background 0.3s ease;
  padding: 2px;
`;

const ToggleThumb = styled.div<{ isActive: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  position: absolute;
  left: ${(props) => (props.isActive ? "calc(100% - 22px)" : "2px")};
  transition: left 0.3s ease;
`;
