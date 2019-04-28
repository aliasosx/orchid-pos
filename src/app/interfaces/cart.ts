export interface Cart {
  foodId: string;
  food: string;
  subFood?: string;
  subfoodId: string;
  price: number;
  quantity: number;
  total: number;
  note?: string;
  createdAt: Date;
  users: string;
}
