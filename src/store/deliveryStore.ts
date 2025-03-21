//winnerPage와 HostResultPage 모두 쓰이는 deliveryState
import { create } from 'zustand';
import { TDeliveryStatus } from '../types/deliveryStatus';

interface DeliveryState {
  deliveryId: number | null;
  deliveryStatus: TDeliveryStatus;
  setDeliveryId: (id: number) => void;
  setDeliveryStatus: (status: TDeliveryStatus) => void;
}

const useDeliveryStore = create<DeliveryState>((set) => ({
  deliveryId: null,
  deliveryStatus: 'WAITING_ADDRESS',
  setDeliveryId: (id) => set({ deliveryId: id }),
  setDeliveryStatus: (status) => set({ deliveryStatus: status }),
}));

export default useDeliveryStore;
