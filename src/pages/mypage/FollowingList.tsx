import React, { useState } from "react";
import styled from "styled-components";
import BigTitle from "../../components/BigTitle";
import FollowingItem from "../../components/FollowingItem";

const FollowingList: React.FC = () => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  const items = new Array(12).fill("닉네임");

  const handleToggle = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Container>
      {/* ✅ BigTitle 위에 버튼 겹치기 */}
      <BigTitleWrapper>
        <BigTitle>팔로잉 목록</BigTitle>
        <ButtonWrapper>
          {isDeleteMode ? (
            <>
              <DeleteButton>팔로우 취소</DeleteButton>
              <CancelButton onClick={() => setIsDeleteMode(false)}>선택 취소</CancelButton>
            </>
          ) : (
            <SelectButton onClick={() => setIsDeleteMode(true)}>선택</SelectButton>
          )}
        </ButtonWrapper>
      </BigTitleWrapper>

      {/* ✅ 팔로잉 리스트 */}
      <ListContainer>
        {items.map((item, index) => (
          <FollowingItem
            key={index}
            username={item}
            isDeleteMode={isDeleteMode}
            isChecked={!!checkedItems[index]}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </ListContainer>
    </Container>
  );
};

export default FollowingList;

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

const BigTitleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 10px;
`;

const SelectButton = styled.button`
  display: inline-flex;
  height: 31px;
  padding: 0 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 11px;
  background: #c908ff;
  color: white;
  font-size: 14px;
  border: none;
  cursor: pointer;
`;

const CancelButton = styled.button`
  display: inline-flex;
  height: 31px;
  padding: 0 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 11px;
  border: 1px solid #c908ff;
  background: rgba(201, 8, 255, 0.2);
  color: #c908ff;
  font-size: 14px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  display: inline-flex;
  height: 31px;
  padding: 0 14px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 11px;
  background: #c908ff;
  color: white;
  font-size: 14px;
  cursor: pointer;
  border: none;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px 108px;
  width: 100%;
  margin-top: 50px;
`;
