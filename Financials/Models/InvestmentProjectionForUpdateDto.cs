using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class InvestmentProjectionForUpdateDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string ProjectionName { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal RepeatInvestmentAmount { get; set; }
        public int RepeatInvestmentFrequency { get; set; }
        public int PurchaseFrequency { get; set; }
        public int YearRangeLow { get; set; }
        public int YearRangeHigh { get; set; }

        public Security[] securities { get; set; }
    }
}
