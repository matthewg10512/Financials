using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class StockScreenerSearchDetail
    {

        public int id { get; set; }
        public string SearchValue { get; set; }
        public int StockScreenerId { get; set; }
        public int ScreenerCriteriaId { get; set; }
    }
}
