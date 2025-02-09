import React from "react";
import styled from "styled-components";
import BigTitle from "../../components/BigTitle";
import SmallTitle from "../../components/SmallTitle";
import { useNavigate } from "react-router-dom";

const Setting: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    alert("로그아웃 되었습니다.");
    navigate("/login"); // 로그인 페이지로 이동
  };

  const handleAccountDeletion = () => {
    const confirmDeletion = window.confirm(
      "정말 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
    );
    if (confirmDeletion) {
      alert("계정이 삭제되었습니다.");
      navigate("/");
    }
  };

  return (
    <Container>
      <BigTitleWrapper>
        <BigTitle>설정</BigTitle>
      </BigTitleWrapper>
      <SmallTitleBox>
        <SmallTitle onClick={() => handleNavigation("/mypage/address")}>
          배송지 설정
        </SmallTitle>
        <SmallTitle onClick={() => handleNavigation("/mypage/payment")}>
          결제 정보 설정
        </SmallTitle>
        <SmallTitle onClick={() => handleNavigation("/mypage/public-information-set")}>
          공개 정보 설정
        </SmallTitle>
        <SmallTitle onClick={handleAccountDeletion}>계정 탈퇴</SmallTitle>
        <SmallTitle onClick={handleLogout}>로그아웃</SmallTitle>
      </SmallTitleBox>
    </Container>
  );
};

export default Setting;

const Container = styled.div`
  background: white;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  text-align: center;
  margin-top: 64px;
`;

const BigTitleWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const SmallTitleBox = styled.div`
  display: flex; /* Flex 컨테이너 */
  flex-direction: column; /* 세로 방향 정렬 */
  align-items: flex-start; /* 왼쪽 정렬 */
  justify-content: flex-start; /* 상단 정렬 */
  margin-top: 66px;
  margin-left: 112px;
  gap: 78px; /* 요소 간 간격 78px 유지 */
  cursor: pointer;
`;