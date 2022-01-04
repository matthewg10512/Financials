import { Security } from "./security";
import { SecurityPercentageStatistic } from "./SecurityPercentageStatistic";
import { CurrentPeakRange } from "./currentpeakranges";
import { SecurityPurchaseCheck } from "./SecurityPurchaseCheck";

export interface StockPurchaseOption {


  security: Security;
  securityPercentageStatistic: SecurityPercentageStatistic;
  currentPeakRange: CurrentPeakRange;
  securityPurchaseCheck: SecurityPurchaseCheck;
}
