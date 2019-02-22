export interface Cart {
  foodId: string;
  food: string;
  price: number;
  quantity: number;
  total: number;
  note?: string;
  createdAt: Date;
  users: string;
}
