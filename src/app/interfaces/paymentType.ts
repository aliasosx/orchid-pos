export interface PaymentType {
  paymentCode: string;
  paymentName: string;
  paymentDescription: string;
  bankAcquirer?: string;
  bank?: any;
  enabled: boolean;
}
