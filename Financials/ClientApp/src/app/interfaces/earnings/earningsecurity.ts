import { Security } from "./../security";

export interface EarningSecurity {
  id: number;
  securityId: number;
  actualEarningsDate: string;
  ePSEstimate: number;
  reportedEPS: number;
  gAAPEPS: number;
  revenueEstimate: number;
  actualRevenue: number;
  reportTime: string;
  security: Security
}
