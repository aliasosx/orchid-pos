export interface Food {
  foodId: number;
  food_name: string;
  food_name_en: string;
  food_photo: string;
  food_category: string;
  cost: number;
  price: number;
  currency: string;
  parent_food: number;
  is_childFood: boolean;
  extendedFoods?: any;
  kitchen: string;
  extendedFoodType?: any;
  userName: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
