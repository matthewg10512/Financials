import { Security } from "../../interfaces/security";

export class InvestProjectionModel {
  userId: number;
  projectionName: string;
  repeatInvestmentAmount: number;
  repeatInvestmentFrequency: number;
  purchaseFrequency: number;
  yearRangeLow: number;
  yearRangeHigh: number;
  securities: Security[];
  totalStocks: number;
  id: number;

  constructor() {
    this.projectionName = '';
    this.repeatInvestmentAmount = 10000;
    this.repeatInvestmentFrequency = 1;
    this.purchaseFrequency = 5;
    this.yearRangeLow = 2015;
    this.yearRangeHigh = new Date().getFullYear();

  }

  


}
