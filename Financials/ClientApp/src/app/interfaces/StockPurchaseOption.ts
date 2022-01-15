import { Security } from "./security";
import { SecurityPercentageStatistic } from "./SecurityPercentageStatistic";
import { CurrentPeakRange } from "./currentpeakranges";
import { PriorPurchaseEstimate } from "./PriorPurchaseEstimate";
import { PeakRangeDetail } from "./peakrangedetail";

export interface StockPurchaseOption {


  security: Security;
  securityPercentageStatistic: SecurityPercentageStatistic;
  currentPeakRange: CurrentPeakRange;
  priorPurchaseEstimate: PriorPurchaseEstimate;
  peakRangeDetail: PeakRangeDetail[];
}
