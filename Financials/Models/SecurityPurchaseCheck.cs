﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class PriorPurchaseEstimate
    {
        public int Id { get; set; }
        public int SecurityId { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }
        public decimal Shares { get; set; }

        public decimal PurchasePrice { get; set; }
        public DateTime FirstPurchaseDate { get; set; }
        public int PurchaseFrequency { get; set; }

    }
}
