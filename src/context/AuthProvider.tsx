import { useState, useEffect, ReactNode } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import axiosInstance from '../apis/axiosInstance';
import axios, { AxiosError } from 'axios';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로그인 함수
  const login = async () => {
    try {
      const response = await axiosInstance.get('/api/member/user-info');
      if (response.data.result === 'guest') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        //error가 unknown으로 뜨는 것 방지지
        if (error.response?.status === 401) {
          console.error('토큰 만료됨:', error);
          try {
            const response = await axiosInstance.get('/api/member/reissue'); //refresh?
            if (response.data.result == 'guest') {
              setIsAuthenticated(true);
            } else {
              setIsAuthenticated(false);
            }
            console.log(response.data);
          } catch (error) {
            setIsAuthenticated(false);
          }
        } else {
          console.error('로그인 체크 실패:', error);
          setIsAuthenticated(false);
        }
      } else {
        console.error('예상치 못한 에러:', error);
        setIsAuthenticated(false);
      }
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      const response = await axiosInstance.post('/api/permit/logout');
      if (response.status === 200) {
        console.log('로그아웃 성공');
        setIsAuthenticated(false);
      } else {
        console.log('로그아웃 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
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
