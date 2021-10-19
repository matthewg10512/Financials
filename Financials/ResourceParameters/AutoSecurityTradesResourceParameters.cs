using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.ResourceParameters
{
    public class AutoSecurityTradesResourceParameters
    {
        public DateTime rangePurchaseDateStart { get; set; }
        public DateTime rangePurchaseDateEnd { get; set; }
        public DateTime rangeSellDateStart { get; set; }
        public DateTime rangeSellDateEnd { get; set; }
        public bool? positionSold { get; set; }

        public int securityId { get; set; }
    }
}
