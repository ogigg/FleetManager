using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FleetManager.Resources
{
    public class GPSCoordinatesResource
    {
        public int Id { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public int Speed { get; set; }
        public DateTime TimeStamp { get; set; }
        public int CarId { get; set; }
    }
}
