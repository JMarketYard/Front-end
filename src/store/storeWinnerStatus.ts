import { create } from 'zustand';

interface WinnerStatusChanged {
  isWinnerStatusChanged: boolean;
  toggleWinnerStatus: () => void; // 상태를 토글하는 함수
}

export const useWinnerStatusChanged = create<WinnerStatusChanged>((set) => ({
  isWinnerStatusChanged: false,
  toggleWinnerStatus: () =>
    set((state) => ({ isWinnerStatusChanged: !state.isWinnerStatusChanged })),
}));
