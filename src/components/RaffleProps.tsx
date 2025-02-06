interface RaffleProps {
  raffleId: number;
  imageUrls: string[];
  name: string;
  ticketNum: number;
  timeUntilEnd: number;
  finish: boolean;
  participantNum: number;
  like: boolean;
  children?: React.ReactNode;
}

export default RaffleProps;
