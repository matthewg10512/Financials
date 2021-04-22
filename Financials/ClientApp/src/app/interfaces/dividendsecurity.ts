import { Security } from "./security";

export interface DividendSecurity {
  id: number;
  securityId: number;
  announcementDate: string;
  frequency: string;
  amount: number;
  yield: number;
  exDividendDate: Date;
  recordDate: string;
  payableDate: string;
  security: Security
}
