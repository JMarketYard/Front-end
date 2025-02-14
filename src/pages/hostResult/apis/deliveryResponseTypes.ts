export interface DeliveryResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: DeliverySuccessResult;
}

export interface DeliverySuccessResult {
  raffle_id: number;
  winner_id: number;
  delivery_id: number;
  min_ticket: number;
  apply_ticket: number;
  finalAmount: number;
  delivery_status: string;
  shipping_deadline?: string | null;
  is_extend_shipping?: boolean | null;
  address?: Address | null;
}

export interface Address {
  address_id: number;
  recipient_name: string;
  postal_code: string;
  address_detail: string;
  phone_number: string;
}
