export interface Bom {
  id?: string;
  food: any;
  products?: any; // productCode , ProductName, Quantity, Unit
  enabled: boolean;
  username: string;
  createdAt: Date;
}
