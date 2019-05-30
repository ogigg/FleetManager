using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FleetManager.Resources;
using Microsoft.AspNetCore.SignalR;

namespace FleetManager.Hubs
{
    public class SignalRHub : Hub<ISignalR>
    {
    }
}
