interface RaffleDetailProps {
  imageUrls?: string[];
  name?: string;
  category?: string;
  ticketNum?: number;
  startAt?: string; // ISO 8601 형식의 날짜 (Date 변환 가능)
  endAt?: string;
  description?: string;
  minUser?: number;
  view?: number;
  likeCount?: number;
  applyCount?: number;
  nickname?: string;
  followCount?: number;
  reviewCount?: number;
  userStatus?: string;
  isWinner?: string;
  raffleStatus?: string;
  children?: React.ReactNode;
}

export default RaffleDetailProps;
