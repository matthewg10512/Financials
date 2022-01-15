using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class StockPurchaseOptionDto
    {
        public Security Security { get; set; }
        public SecurityPercentageStatistic SecurityPercentageStatistic { get; set; }
        public CurrentPeakRange CurrentPeakRange { get; set; }

        public PriorPurchaseEstimate PriorPurchaseEstimate { get; set; }

        public List<PeakRangeDetail> PeakRangeDetail { get; set; }

    }
}
