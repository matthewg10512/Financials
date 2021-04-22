using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Financials
{
    public class HistoricalPrice
    {

        public int Id { get; set; }
        public int SecurityId { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal open { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal close { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal high { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal low { get; set; }

        public int volume { get; set; }
        public DateTime HistoricDate { get; set; }

    }
}
