export interface Cart {
  foodId: string;
  food: string;
  subFood?: string;
  subfoodId: string;
  orgPrice?: number;
  price: number;
  discount: number;
  quantity: number;
  total: number;
  note?: string;
  createdAt: Date;
  users: string;
  disc?: string;
  sign?: string;
  orgCost?: number;
}
