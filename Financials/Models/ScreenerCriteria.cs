using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Financials.Models
{
    public class ScreenerCriteria
    {
        public int id { get; set; }
        public string CriteriaName { get; set; }

        public string Description { get; set; }

        public string JSONObjectName { get; set; }
        public string ObjectType { get; set; }
    }
}
