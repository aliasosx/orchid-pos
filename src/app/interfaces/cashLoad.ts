export interface CashLoad {
  id: string;
  loadDateTime: Date;
  initBalance: number;
  openAuthorizedBy: string;
  loadApproved: boolean;
  eodCashBalance: number;
  eodBankBalance: number;
  cashBalance: number;
  cashInHands: number;
  closeBalance: number;
  totalSellAmount: number;
  close: boolean;
  closeDatetime: Date;
  closeby: string;
  closeAuthorizedBy: string;
  closeApproved: boolean;
  note: string;
}
