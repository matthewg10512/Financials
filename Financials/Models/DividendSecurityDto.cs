using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Financials
{
    public class DividendSecurityDto
    {
        public int Id { get; set; }
        public int SecurityId { get; set; }
        public string symbol { get; set; }
        public DateTime AnnouncementDate { get; set; }
        public string Frequency { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Yield { get; set; }
        public DateTime ExDividendDate { get; set; }
        public DateTime RecordDate { get; set; }
        public DateTime PayableDate { get; set; }
        public Security security { get; set; }
    }
}
