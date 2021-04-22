using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials
{
    public class PreferredEarning
    {

            public int id { get; set; }
            public int stockId { get; set; }
            public DateTime actualEarningsDate { get; set; }
            public DateTime fiscalQuaterEnd { get; set; }
            public float epsEstimate { get; set; }
            public float reportedEPS { get; set; }
            public float gaapeps { get; set; }
            public float revenueEstimate { get; set; }
            public float actualRevenue { get; set; }
            public string name { get; set; }
            public string symbol { get; set; }

    }
}
