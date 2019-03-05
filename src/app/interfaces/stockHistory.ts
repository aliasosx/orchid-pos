export interface StockHistory {
  id?: string;
  productId: string;
  productName: string;
  beforeQuantity: number;
  stockChange: string;
  currentQuantity: number;
  updateDate: Date;
  updateSource: string; // Sale module Or Purchase
  purchaseDetail?: object;
  orderId?: string;
  createdAt: Date;
  username?: string;
}
