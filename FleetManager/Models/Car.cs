using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FleetManager.Models
{
    public class Car
    {

        public int Id { get; set; }
        [Required]
        [StringLength(255)]
        public string CarName { get; set; }
    }
}
