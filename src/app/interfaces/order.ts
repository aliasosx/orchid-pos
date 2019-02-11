export interface Order {
  orderId: string;
  refno: string;
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
}
