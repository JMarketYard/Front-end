import React, { useState } from "react";
import axiosInstance from "../../../apis/axiosInstance"; // ✅ axios 추가
import Modal from "../Modal";
import styled from "styled-components";
import vector from "../../../assets/Vector.png";

interface ModalProps {
  onClose: () => void;
  currentNickname: string; // ✅ 현재 닉네임
  onNicknameChange: (newNickname: string) => void; // ✅ 변경된 닉네임을 상위 컴포넌트로 전달
}

const NameEditModal: React.FC<ModalProps> = ({ onClose, currentNickname, onNicknameChange }) => {
  const [name, setName] = useState<string>(currentNickname);
  const [isError, setIsError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // ✅ 로딩 상태 추가

  const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    if (!regex.test(name)) {
      setIsError("닉네임은 2~10자의 한글, 영어, 숫자만 사용 가능합니다.");
      return;
    }
    setIsError(""); // ✅ 기존 에러 메시지 제거
    setLoading(true); // ✅ API 요청 시작 (버튼 비활성화)

    try {
      const response = await axiosInstance.patch(
        "/mypage/nickname",
        { nickname: name }, // ✅ API 요청 데이터
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // ✅ 토큰 추가
          },
        }
      );

      if (response.data.isSuccess) {
        onNicknameChange(name); // ✅ 상위 컴포넌트에 변경된 닉네임 전달
        onClose(); // ✅ 모달 닫기
      } else {
        setIsError("닉네임 변경에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("닉네임 변경 오류:", error);
      setIsError("서버 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false); // ✅ API 요청 완료 (버튼 활성화)
    }
  };

  return (
    <Modal onClose={onClose}>
      <Container>
        <Img src={vector} />
        <Title>닉네임 변경하기</Title>
        <Error>{isError}</Error>
        <Input
          value={name}
          onChange={handleChangeName}
          placeholder="닉네임을 입력하세요. (한글, 숫자, 영어 2~10자)"
          isError={!!isError}
        />
        <Button disabled={!name || loading} onClick={handleSubmit}>
          {loading ? "변경 중..." : "변경하기"}
        </Button>
      </Container>
    </Modal>
  );
};

const Error = styled.div`
  margin-top: 28px;
  width: 255px;
  height: 17px;
  font-size: 11px;
  font-weight: 400;
  line-height: 150%;
  color: #c908ff;
  font-family: "Noto Sans KR";
  transform: translateX(-18px);
`;

const Button = styled.button`
  width: 302px;
  height: 39px;
  border-radius: 7px;
  background-color: #c908ff;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    background: #ccc;
  }
`;

const Input = styled.input<{ isError: boolean }>`
  margin-top: 4px;
  margin-bottom: 161px;
  border-radius: 5px;
  border: ${({ isError }) => (isError ? "1px solid #C908FF" : "none")};
  background: #f7f7f7;
  width: 272px;
  height: 31px;
  padding: 3.2px 14px;
  outline: none;

  &::placeholder {
    font-family: Pretendard;
    font-size: 12px;
    font-weight: 300;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-family: Pretendard;
`;

const Img = styled.img`
  margin-top: 64px;
  width: 31px;
  height: 30px;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default NameEditModal;
