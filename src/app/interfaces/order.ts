export interface Order {
  orderId: string;
  refno: string;
  invoiceno: string;
  ticket: number;
  food: any;
  grandtotal: number;
  recieved: number;
  change: number;
  paymentType: any;
  orderDateTime: Date;
  orderFinishTime: Date;
  settled: boolean;
  completed: boolean;
  status?: string;
  kitchen: string;
  username: string;
}
