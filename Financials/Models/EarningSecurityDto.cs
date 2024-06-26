﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Financials
{
    public class EarningSecurityDto
    {
        public int Id { get; set; }
        public int SecurityId { get; set; }
        public DateTime ActualEarningsDate { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal EPSEstimate { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal ReportedEPS { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal GAAPEPS { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal RevenueEstimate { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal ActualRevenue { get; set; }
        public string ReportTime { get; set; }
        public string symbol { get; set; }
        public Security security { get; set; }
    }
}
