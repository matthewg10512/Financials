using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class PeakRangeDetail
    {
        public int Id { get; set; }
        public int SecurityId { get; set; }
        public string RangeName { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int RangeCount { get; set; }
        public int RangeLength { get; set; }
        public int MaxRangeLength { get; set; }
        public DateTime MaxRangeDateStart { get; set; }
        public DateTime MaxRangeDateEnd { get; set; }

    }
}
