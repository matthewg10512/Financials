using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Financials
{
    public class PreferredSecurity
    {

        public int Id { get; set; }
        public int SecurityId { get; set; }
        public DateTime? LastModified { get; set; }
        public string Name { get; set; }
        public string Symbol { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? DayLow { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? DayHigh { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal CurrentPrice { get; set; }

    }
}
