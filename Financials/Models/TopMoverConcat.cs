using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class TopMoverConcat
    {
        public int SecurityId { get; set; }
        public string Movers { get; set; }

        
    }
}
