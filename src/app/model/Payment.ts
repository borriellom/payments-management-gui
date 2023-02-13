export interface Payment {
  id: number;
  createdDate: Date;
  payerEmail: string;
  status: any;
  currency: string;
  amount: number;
  paidDate: Date;

}
