export interface Dividend {
  id: number;
  securityId: number;
  announcementDate: string;
  frequency: string;
  amount: number;
  yield: number;
  exDividendDate: string;
  recordDate: string;
  payableDate: string;
}
