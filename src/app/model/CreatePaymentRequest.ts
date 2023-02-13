export interface CreatePaymentRequest {
  payerEmail: string;
  amount: number;
  currency: string;
}
