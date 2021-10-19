using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class AutoSecurityTradeSecurityDto
    {
        public int Id { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public int? SecurityId { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public DateTime? SellDate { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PurchasePrice { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? SellPrice { get; set; }
        public int? SharesBought { get; set; }
        public int? PercentageLevel { get; set; }

        public Security security { get; set; }
        public int totalamount { get{ return 0; } set { value = 0; } }


    }
}
