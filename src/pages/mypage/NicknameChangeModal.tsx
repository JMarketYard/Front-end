import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import styled from "styled-components";

interface ModalProps {
  onClose: () => void;
}

const NicknameChangeModal: React.FC<ModalProps> = ({ onClose }) => {
  const [nickname, setNickname] = useState("");

  return (
    <Modal onClose={onClose}>
      <Container>
        <Title>닉네임 변경</Title>
        <Input
          type="text"
          placeholder="새 닉네임을 입력하세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <ButtonWrapper>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <SaveButton onClick={onClose}>변경하기</SaveButton>
        </ButtonWrapper>
      </Container>
    </Modal>
  );
};

export default NicknameChangeModal;

/* ✅ 스타일 */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Title = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background: #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background: #c908ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
`;
