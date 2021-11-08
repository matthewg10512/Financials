import { Security } from "./security";

export class investmentprojectionforupdate {
  id: number;
  userId: number;
  projectionName: string;
  repeatInvestmentAmount: number;
  repeatInvestmentFrequency: number;
  purchaseFrequency: number;
  yearRangeLow: number;
  yearRangeHigh: number;
  securities: Security[];

}
