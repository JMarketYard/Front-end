export type TRaffleDetail = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    imageUrls: string[];
    name: string;
    category: string;
    ticketNum: number;
    startAt: string; // ISO 8601 형식의 날짜 (Date 변환 가능)
    endAt: string;
    description: string;
    minUser: number;
    view: number;
    likeCount: number;
    applyCount: number;
    nickname: string;
    storeId: number;
    followCount: number;
    reviewCount: number;
    userStatus: string;
    isWinner: string;
    raffleStatus: string;
    deliveryId: number;
  };
};
