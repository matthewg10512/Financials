using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class StockScreenerRecordDto
    {
        public StockScreener StockScreener { get; set; }
        public List<ScreeneCriteriaDetailDto> StockScreenerSearchDetails { get; set; }
    }
}
