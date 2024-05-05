export interface EarningsHistoricDate {
  id: number;
  securityId: number;
  earningsDate: Date;
  historicDate: Date;
  reportTime: number;
  percentChange: number;
  epsEstimate: number;
  reportedEPS: number;
  revenueEstimate: number;
  actualRevenue: number;


}
