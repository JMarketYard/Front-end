export interface DeliveryResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: DeliverySuccessResult;
}

export interface DeliverySuccessResult {
  raffleId: number;
  winnerId: number;
  deliveryId: number;
  minTicket: number;
  applyTicket: number;
  finalAmount: number;
  deliveryStatus: string;
  shippingDeadline?: string | null;
  isExtendShipping?: boolean | null;
  address?: Address | null;
}

export interface Address {
  addressId: number;
  recipientName: string;
  postalCode: string;
  addressDetail: string;
  phoneNumber: string;
}
