using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Financials.ResourceParameters
{
    public class DividendsResourceParameters 
    {
        public int securityId { get; set; }
        public DateTime exDividendDate { get; set; }
        public DateTime rangeExDividendDateStart { get; set; }
        public DateTime rangeExDividendDateEnd { get; set; }
        public string searchQuery { get; set; }

    }
}
