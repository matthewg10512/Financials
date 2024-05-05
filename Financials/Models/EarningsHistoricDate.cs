using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Financials.Models
{
    
    public class EarningsHistoricDate
    {

        public int Id { get; set; }
        public int SecurityId { get; set; }
        public DateTime EarningsDate { get; set; }
        public DateTime HistoricDate { get; set; }
        public string ReportTime { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal? PercentChange { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal EPSEstimate { get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal ReportedEPS { get; set; }
        [Column(TypeName = "decimal(18,2)")] 
        public decimal RevenueEstimate { get; set; }
        [Column(TypeName = "decimal(18,2)")] 
        public decimal ActualRevenue { get; set; }
        
        
    }
}
