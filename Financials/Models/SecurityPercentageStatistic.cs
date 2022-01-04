using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class SecurityPercentageStatistic
    {

        public int Id { get; set; }
        public int? SecurityId { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public decimal? AverageDrop { get; set; }
        public decimal? Percent5 { get; set; }
        public decimal? Percent10 { get; set; }
        public decimal? Percent15 { get; set; }
        public decimal? totalPercentSum { get; set; }
        public decimal? highLowRangeAverage { get; set; }

        public int? belowAverageCount { get; set; }
    }
}
