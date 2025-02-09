import React, { ReactNode } from "react";
import styled from "styled-components";

interface SmallTitleProps {
  children: ReactNode;
  onClick?: () => void; // ✅ onClick prop 추가
}

const SmallTitle: React.FC<SmallTitleProps> = ({ children, onClick }) => {
  return (
    <SmallTitleBox onClick={onClick}>
      <SmallTitleIcon />
      {children}
    </SmallTitleBox>
  );
};

export default SmallTitle;

/* 스타일 */
const SmallTitleBox = styled.div`
  width: 200px;
  height: 21px;
  display: flex;
  align-items: center;
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  position: relative;

  &:hover {
    color: #c908ff;
  }
`;

const SmallTitleIcon = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  background-color: rgba(201, 8, 255, 0.2);
  border-radius: 50%;
  margin-right: 52px;
`;
