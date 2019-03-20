using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FleetManager.Models
{
    public class GPSCoordinates
    {
        public int Id { get; set; }
        [Required]
        public double Longitude { get; set; }
        [Required]
        public double Latitude { get; set; }
        public DateTime TimeStamp { get; set; }
        [Required]
        public Car Car{ get; set; }

    }
}
