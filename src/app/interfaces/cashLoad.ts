export interface CashLoad {
  id: string;
  loadDateTime: Date;
  initBalance: number;
  openAuthorizedBy: string;
  eodCashBalance: number;
  eodBankBalance: number;
  cashBalance: number;
  bankBalance: number;
  close: boolean;
  closeDatetime: Date;
  closeby: string;
  closeAuthorizedBy: string;
}
