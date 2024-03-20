using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class StockScreenerAlertTypeDto
    {
        public int id { get; set; }
        public int frequency { get; set; }
        public string awsSNSURL { get; set; }
        public string AlertType { get; set; }
    }
}
