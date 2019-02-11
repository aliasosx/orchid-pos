export interface Transaction {
  transaction_date: Date;
  foodId: number;
  foodName: string;
  cost: number;
  price: number;
  quantity: number;
  total_price: number;
  total_cost: number;
  kitchen: string;
  profit: number;
  settled: boolean;
  username: string;
  orderId: string;
  paymentBy: string; // Bank Cash QR
  refno: string;
  invoiceno: string;
}
