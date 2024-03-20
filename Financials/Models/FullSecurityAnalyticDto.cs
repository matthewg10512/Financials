using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class FullSecurityAnalyticDto
    {
        public int Id { get; set; }
        public string Symbol { get; set; }
        public string Name { get; set; }
        public int? Volume { get; set; }
        public DateTime? EarningsDate { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PercentageChange { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? YearLow { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? YearHigh { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal CurrentPrice { get; set; }
        public SecurityAnalytic securityAnalytic { get; set; }
        public SecurityPercentageStatistic SecurityPercentageStatistic { get; set; }
        public SecurityYearOverYearComparison SecurityYearOverYearComparison { get; set; }
        public CurrentPeakRange CurrentPeakRange { get; set; }
    }
}
