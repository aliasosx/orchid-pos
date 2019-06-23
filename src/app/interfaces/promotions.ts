export interface Promotion {
  id: string;
  promotion_name: string;
  promotionBy: number; // Food, Group , Conditional
  promotionByName: string;
  condition_foods: any;
  promotion_foods: any;
  expireDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
