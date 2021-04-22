using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.ResourceParameters
{
    public class EarningsResourceParameters
    {

        public int securityId { get; set; }
        public DateTime actualEarningsDate { get; set; }
        public DateTime rangeStartEarningsDate { get; set; }
        public DateTime rangeEndEarningsDate { get; set; }
        public string searchQuery { get; set; }
    }
}
