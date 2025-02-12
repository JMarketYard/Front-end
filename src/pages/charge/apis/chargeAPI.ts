import axiosInstance from '../../../apis/axiosInstance';
import { TExchange, Ticket } from './chargeType';

const GetMyTicket = async () => {
  try {
    const response = await axiosInstance.get('/api/member/payment/tickets');
    return response.data;
  } catch (error) {
    console.log('티켓 개수 조회 API 에러', error);
  }
};

const PostCharge = async (data: Ticket) => {
  const response = await axiosInstance.post('/api/payment/create', null, {
    params: {
      itemId: data.itemId,
      itemName: data.itemName,
      totalAmount: data.totalAmount,
    },
  });
  console.log('충전 data', data);
  return response.data;
};

const PostExchange = async (data: TExchange) => {
  const response = await axiosInstance.post('/api/member/payment/exchange', {
    quantity: data.quantity,
    amount: data.amount,
  });
  console.log('환전 data', data);
  return response.data;
};

const GetChargeHistory = async (period: string) => {
  try {
    const response = await axiosInstance.get(
      '/api/member/payment/history/charge',
      {
        params: { period },
      },
    );
    return response.data;
  } catch (error) {
    console.log('충전 내역 조회 API 에러', error);
  }
};

const GetExchangeHistory = async (period: string) => {
  try {
    const response = await axiosInstance.get(
      '/api/member/payment/history/exchange',
      {
        params: { period },
      },
    );
    return response.data;
  } catch (error) {
    console.log('환전 내역 조회 API 에러', error);
  }
};

export {
  GetMyTicket,
  PostCharge,
  PostExchange,
  GetChargeHistory,
  GetExchangeHistory,
};
