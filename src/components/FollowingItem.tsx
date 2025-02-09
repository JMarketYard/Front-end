import React from "react";
import styled from "styled-components";

interface FollowingItemProps {
  username: string;
  isDeleteMode: boolean;
  isChecked: boolean;
  onToggle: () => void;
}
 
const FollowingItem: React.FC<FollowingItemProps> = ({
  username,
  isDeleteMode,
  isChecked,
  onToggle,
}) => {
  return (
    <ItemContainer onClick={isDeleteMode ? onToggle : undefined}>
      {isDeleteMode && (
        <CheckCircle isChecked={isChecked}>
          {isChecked && <CheckMark>✔</CheckMark>}
        </CheckCircle>
      )}
      <ProfileImage />
      <Username>{username}</Username>
    </ItemContainer>
  );
};

export default FollowingItem;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px; /* ✅ 체크박스, 프로필 이미지, 닉네임 사이 간격 */
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
  position: relative;
  padding: 10px 0;
`;

const CheckCircle = styled.div<{ isChecked: boolean }>`
  width: 27px;
  height: 27px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 2px solid ${({ isChecked }) => (isChecked ? "#C908FF" : "#999")};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ isChecked }) => (isChecked ? "#C908FF" : "transparent")};
  color: white;
  transition: all 0.3s ease;
`;

const ProfileImage = styled.div`
  width: 78px;
  height: 78px;
  border-radius: 50%;
  background: #d3d3d3;
  margin-right: 33px; /* ✅ 사진과 닉네임 사이의 간격 (33px) */
  margin-left: 35px;
`;

const Username = styled.div`
  color: #000;
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 36.832px; /* 184.159% */
  white-space: nowrap; /* ✅ 텍스트 줄바꿈 방지 */
`;


const CheckMark = styled.span`
  font-size: 16px;
  font-weight: bold;
`;
