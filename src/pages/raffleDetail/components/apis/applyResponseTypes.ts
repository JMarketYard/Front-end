export type ApplySuccessResult = {
  user_id: number;
  raffle_id: number;
  raffle_image: string;
  end_at: string;
};

export type ApplyFailureMissingTickets = {
  missingTickets: number;
};

export type ApplyResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: ApplySuccessResult | ApplyFailureMissingTickets;
};
