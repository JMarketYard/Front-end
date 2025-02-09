import axiosInstance from '../../../apis/axiosInstance';

type Ticket = {
  itemId: string;
  itemName: string;
  totalAmount: number;
};

type Exchange = {
  quantity: number;
  amount: number;
};

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

const PostExchange = async (data: Exchange) => {
  const response = await axiosInstance.post('/api/member/payment/exchange', {
    quantity: data.quantity,
    amount: data.amount,
  });
  console.log('환전 data', data);
  return response.data;
};

export { GetMyTicket, PostCharge, PostExchange };
