import { SecurityAnalytic } from "./securityanalytic";
import { SecurityPercentageStatistic } from "./SecurityPercentageStatistic";
import { SecurityYearOverYearComparison } from "./SecurityYearOverYearComparison";
import { CurrentPeakRange } from "./currentpeakranges";
import { EarningsHistoricDate } from "./earningshistoricdate";
import { CurrentBullBearRun } from "./currentbullbearrun";

export interface FullSecurityAnalytic {
  id: number;
  symbol: string;
  name: string;
  volume: number;
  yearLow: number;
  percentageChange: number;
  yearHigh: number;
  currentPrice: number;
  earningsDate: Date;
  securityAnalytic: SecurityAnalytic;
  securityPercentageStatistic: SecurityPercentageStatistic;
  securityYearOverYearComparison: SecurityYearOverYearComparison;
  topMoverDetails: string[];
  currentPeakRange: CurrentPeakRange;
  earningsHistoricDates: EarningsHistoricDate[];
  currentBullBearRuns: CurrentBullBearRun[];
}
