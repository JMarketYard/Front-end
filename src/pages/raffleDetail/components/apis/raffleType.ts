export type ApplyType = {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    user_id: number;
    raffle_id: number;
    raffle_image: string;
    end_at: string;
  };
};
