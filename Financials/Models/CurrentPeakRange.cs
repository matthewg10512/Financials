using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class CurrentPeakRange
    {
        public int Id { get; set; }
        public int SecurityId { get; set; }
        public string RangeName { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int RangeLength { get; set; }
        public DateTime RangeDateStart { get; set; }
        public decimal PeakRangeCurrentPercentage { get; set; }
        public decimal? LastOpenHigh { get; set; }
    }
}
