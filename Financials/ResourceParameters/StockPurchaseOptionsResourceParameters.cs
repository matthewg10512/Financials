using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.ResourceParameters
{
    public class StockPurchaseOptionsResourceParameters
    {
        
        public int? priorPurchaseEstimateSharesRangeLow { get; set; } // 60
        public int? securityVolumeRangeLow { get; set; } //100000
        public DateTime? securityLastModifiedRangeLow { get; set; }//Prior days

        public decimal? securitypercentChangeRangeHigh { get; set; } //0


        public decimal? priorPurchaseEstimateYearlyPercentRangeLow { get; set; }

        public string securityPercentDropperType { get; set; }
        /*
                    case "averagedrop50Low":  average drop times 1.50 percent(so -2 become -3) compared to the low for day 
                    case "averagedropLow":   average drop compared to the low for day
                    case "percent5Low":   top 5 percent dropppers compared to the low for day
                    case "percent10Low": top 10 percent droppers compared to the low for day
                    case "percent15Low": top 15 percent droppers compared to the low for the day
                    case "averagedrop50CurrentPrice": average drop times 1.50 percent(so -2 become -3) compared to the current price for day 
                    case "averagedropCurrentPrice":  average drop compared to the current price for day 
                    case "percent5CurrentPrice":   top 5 percent droppers compared to the current price for day 
                    case "percent10CurrentPrice":  top 10 percent droppers compared to the current price for day 
                    case "percent15CurrentPrice":  top 15 percent droppers compared to the current price for day 
         */

    }
}
