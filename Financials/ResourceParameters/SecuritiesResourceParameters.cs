using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.ResourceParameters
{
    public class SecuritiesResourceParameters : IResourceParameter
    {
        public string symbol { get; set; }
        public string sector { get; set; }
        public string industry { get; set; }
        public string searchQuery { get; set; }
        public bool? preferred { get; set; }
        public DateTime? lastModifiedPrior { get; set; }
        public string filtertype { get; set; }
        public string perChangeLow { get; set; }
        public string perChangeHigh { get; set; }
        public decimal? perFrom52WeekLow { get; set; }
        public decimal? perFrom52WeekHigh { get; set; }
        public int? minVolume { get; set; }
        public decimal? currentPriceMin { get; set; }
        public decimal? currentPriceMax { get; set; }


    }
}
