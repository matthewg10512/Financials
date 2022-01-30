using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.ResourceParameters
{
    public class StockScreenerAlertsHistorySearchResourceParameters
    {
        public int? StockScreenerId { get; set; }


        public DateTime? AlertDate { get; set; }
        public DateTime? AlertDateRangeStart { get; set; }

        public DateTime? AlertDateRangeEnd { get; set; }
    }
}
