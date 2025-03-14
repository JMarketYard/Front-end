import { create } from 'zustand';

interface RaffleData {
  raffleId: number;
  minTicket: number;
  applyTicket: number;
  totalAmount?: number;
  remainedMinutes?: number;
}

interface Address {
  addressId: number;
  recipientName: string;
  postalCode: string;
  addressDetail: string;
  phoneNumber: string;
}

interface DeliveryData {
  raffleId: number;
  winnerId: number;
  deliveryId: number;
  minTicket: number;
  applyTicket: number;
  totalAmount: number;
  deliveryStatus: string;
  shippingDeadline?: string | null;
  address: Address;
}

const defaultAddress: Address = {
  addressId: 0,
  recipientName: '없음',
  postalCode: '',
  addressDetail: '없음',
  phoneNumber: '',
};

interface HostResultState {
  raffleData: RaffleData;
  deliveryData: DeliveryData;
  setRaffleData: (data: RaffleData) => void;
  setDeliveryData: (data: Partial<DeliveryData>) => void;
}

const useHostResultStore = create<HostResultState>((set) => ({
  raffleData: {
    raffleId: 0,
    minTicket: 0,
    applyTicket: 0,
    totalAmount: 0,
    remainedMinutes: 0,
  },
  deliveryData: {
    raffleId: 0,
    winnerId: 0,
    deliveryId: 0,
    minTicket: 0,
    applyTicket: 0,
    totalAmount: 0,
    deliveryStatus: 'N/A',
    shippingDeadline: null,
    address: defaultAddress, // ✅ 초기값 설정
  },
  setRaffleData: (data) => set({ raffleData: data }),
  setDeliveryData: (data) =>
    set((state) => ({
      deliveryData: {
        ...state.deliveryData,
        ...data,
        address: data.address ?? state.deliveryData.address, // ✅ 기본값 유지
      },
    })),
}));

export default useHostResultStore;
