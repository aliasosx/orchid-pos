import { Food } from "./food";

export interface StaffBenefit {
  id?: string;
  food: any;
  discount: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  username: string;
}
