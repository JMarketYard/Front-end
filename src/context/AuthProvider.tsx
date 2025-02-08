import { useState, useEffect, ReactNode } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import axiosInstance from '../apis/axiosInstance';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로그인 함수
  const login = async () => {
    try {
      const { data } = await axiosInstance.get('/api/member/user-info', {});
      if (data.isSuccess) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('로그인 체크 실패:', error);
      setIsAuthenticated(false);
    }
  };

  // 로그아웃 함수
  const logout = () => {
    setIsAuthenticated(false);
  };

  // 앱 로드 시 로그인 상태 체크
  useEffect(() => {
    login();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
