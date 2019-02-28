export interface Transaction {
  id?: string;
  transaction_date: Date;
  foodId?: number;
  qrRefno?: string;
  foodName: string;
  cost: number;
  price: number;
  quantity: number;
  total_price: number;
  total_cost: number;
  bill_amount: number;
  kitchen: string;
  profit: number;
  settled: boolean;
  username: string;
  orderId: string;
  paymentBy: string; // Bank Cash QR
  refno: string;
  invoiceno: string;
  ticket: string;
}
