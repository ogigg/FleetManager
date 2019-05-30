using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FleetManager.Resources
{
    public interface ISignalR
    {
        Task SendAsync(GPSCoordinatesResource gps);

    }
}
