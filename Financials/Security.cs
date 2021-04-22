using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Financials
{
    public class Security
    {
        public int Id { get; set; }
        public string SecurityType { get; set; }
        public string Name { get; set; }
        [MaxLength(5)]
        public string Symbol { get; set; }
        public decimal? Dividend { get; set; }
        public DateTime? DividendDate { get; set; }
        public DateTime? EarningsDate { get; set; }
        public DateTime? LastModified { get; set; }

        public decimal CurrentPrice { get; set; }
        public int? IPOYear { get; set; }
        public String Sector { get; set; }
        public String Industry { get; set; }

        public decimal? YearLow { get; set; }
        public decimal? YearHigh { get; set; }
        public int? Volume { get; set; }

        public decimal? DayLow { get; set; }
        public decimal? DayHigh { get; set; }

        public bool preferred { get; set; }
        public decimal? PriorDayOpen { get; set; }
        public decimal? PercentageChange { get; set; }

    }
}
