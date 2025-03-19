import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const PrivateRoute = () => {
  const {isAuthenticated} = useAuth();
  
  // 현재 URL 확인
  const location = useLocation();

  if (!isAuthenticated) {
    alert("개인회원 로그인 후 이용해주세요.");
    // ✅ 메인 페이지로 이동
    // ❎ 로그인 모달 열기
    return <Navigate to="/" state={{ from: location }} />;
  }

  // 로그인 상태라면 원래 컴포넌트 렌더링
  return <Outlet />;
};

export default PrivateRoute;