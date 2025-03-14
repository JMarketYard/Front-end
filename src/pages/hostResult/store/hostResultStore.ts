import { create } from 'zustand';

interface HostResultState {
  raffleId: number | null;
  minTicket: number;
  applyTicket: number;
  totalAmount: number;
  setRaffleData: (data: {
    raffleId: number;
    minTicket: number;
    applyTicket: number;
    totalAmount: number;
  }) => void;
}

const useHostResultStore = create<HostResultState>((set) => ({
  raffleId: null,
  minTicket: 0,
  applyTicket: 0,
  totalAmount: 0,
  setRaffleData: (data) =>
    set({
      raffleId: data.raffleId,
      minTicket: data.minTicket,
      applyTicket: data.applyTicket,
      totalAmount: data.totalAmount,
    }),
}));

export default useHostResultStore;
