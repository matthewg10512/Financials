﻿
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Financials
{
    public class Dividend
    {
        public int Id { get; set; }
        public int SecurityId { get; set; }
        public DateTime AnnouncementDate { get; set; }
        public string Frequency { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Yield { get; set; }
        public DateTime ExDividendDate { get; set; }
        public DateTime RecordDate { get; set; }
        public DateTime PayableDate { get; set; }
        public string symbol { get; set; }
    }

}
