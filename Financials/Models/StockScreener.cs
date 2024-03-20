using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class StockScreener
    {
        public int id { get; set; }
        public string Name { get; set; }
        public int AlertType { get; set; }
        public bool AutoTrade { get; set; }
        public int Frequency { get; set; }

    }
}
