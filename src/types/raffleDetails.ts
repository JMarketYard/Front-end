import { TRaffleStatus } from './raffleStatus';
import RaffleDetailProps from './RaffleDetailProps';

export type TRaffleDetail = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: RaffleDetailProps;
};
