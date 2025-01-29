// context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'PARTICIPANT' | 'NON_PARTICIPANT' | 'HOST';

type User = {
  id: string;
  name: string;
  role: UserRole;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

// 🌟 가짜 유저 데이터 (API 없을 때 사용)
const mockUser: User = {
  id: '123',
  name: '테스트 유저',
  role: 'PARTICIPANT', // 'NON_PARTICIPANT' | 'HOST' 로 변경하며 테스트 가능
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(mockUser); // 초기 상태에 더미 데이터 사용

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
