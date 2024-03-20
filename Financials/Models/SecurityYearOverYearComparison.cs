using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class SecurityYearOverYearComparison
    {
        public int Id { get; set; }
        public int SecurityId { get; set; }
        public int YearCount { get; set; }
        public int AvgYOYUp { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal AvgReturnYOY { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal CurrentYearAverage { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal PriorYearAverage { get; set; }
        public int MinYOYUp { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal MinAvgReturnYOY { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal CurrentYearMin { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal PriorYearMin { get; set; }
        public int MaxYOYUp { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal MaxAvgReturnYOY { get; set; }
        public decimal CurrentYearMax { get; set; }
        public decimal PriorYearMax { get; set; }
        public DateTime LastModified { get; set; }
    }
}
