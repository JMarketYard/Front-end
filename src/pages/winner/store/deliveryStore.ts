import { create } from 'zustand';

interface DeliveryStoreState {
  shouldRefetch: boolean;
  triggerRefetch: () => void;
}

const useDeliveryStore = create<DeliveryStoreState>((set) => ({
  shouldRefetch: false, //상태 변경 감지용 boolean 값
  triggerRefetch: () =>
    set((state) => ({ shouldRefetch: !state.shouldRefetch })), //상태 변경 함수
}));

export default useDeliveryStore;
