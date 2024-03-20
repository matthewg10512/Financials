using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class StockScreenerAlertsHistorySecurityJoinDto
    {
        public StockScreenerAlertsHistoryDto stockScreenerAlertsHistory { get; set; }
        public SecurityDto security { get; set; }
    }
}
