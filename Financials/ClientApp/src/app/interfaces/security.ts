export interface Security {
  id: number;
  name: string;
  symbol: string;
  lastModified: string;
  dayLow: number;
  dayHigh: number;
  currentPrice: number;
  preferred: boolean;
  priorDayOpen: number;
  percentageChange: number;
  yearLow: number;
  yearHigh: number;
  dividend: Date;
  dividendamount: number;
  earning: string;
  description: string;
  iPODate: Date;

}
