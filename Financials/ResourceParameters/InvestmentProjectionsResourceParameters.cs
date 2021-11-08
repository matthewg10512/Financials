using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.ResourceParameters
{
    public class InvestmentProjectionsResourceParameters
    {
        public int UserId { get; set; }
        public decimal RepeatInvestmentAmount { get; set; }
        public int RepeatInvestmentFrequency { get; set; }
        public int PurchaseFrequency { get; set; }
        public int YearRangeLow { get; set; }
        public int YearRangeHigh { get; set; }
    }
}
