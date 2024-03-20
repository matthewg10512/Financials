using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SecuritiesApi.Entities
{
    [Display(Name = "TopMoverCategories")]
    public class TopMoverCategory
    {
        public int Id { get; set; }
        public string MovingCategory { get; set; }

        
    }
}
