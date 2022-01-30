using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class StockScreenerAlertsHistoryDto
    {
        public int id { get; set; }
        public int SecurityId { get; set; }
        public int StockScreenerId { get; set; }
        public DateTime DateRecorded { get; set; }
        public decimal alertPrice { get; set; }
        public decimal alertPercent { get; set; }
    }
}
