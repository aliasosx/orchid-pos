export interface Order {
  orderId: string;
  refno: string;
  ticket: number;
  food: any;
  grandtotal: number;
  orderDateTime: Date;
  orderFinishTime: Date;
  settled: boolean;
  completed: boolean;
}
