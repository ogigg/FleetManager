using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FleetManager.Data;
using FleetManager.Hubs;
using FleetManager.Models;
using FleetManager.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace FleetManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GPSController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        private IHubContext<SignalRHub, ISignalR> _hub;
        public GPSController(ApplicationDbContext context, IMapper mapper, IHubContext<SignalRHub, ISignalR> hub)
        {
            _context = context;
            _mapper = mapper;
            _hub = hub;
        }

        // GET: api/GPS
        //[Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GPSCoordinatesResource>>> GetAllGpsCoordinateses()
        {
            var gpsList = await _context.GpsCoordinateses.ToListAsync();
 
            return _mapper.Map<List<GPSCoordinates>, List<GPSCoordinatesResource>>(gpsList);

        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<GPSCoordinates>> GetGPSCoordinates(int id)
        {
            var gpsCoordinates = await _context.GpsCoordinateses.FindAsync(id);

            if (gpsCoordinates == null)
            {
                return NotFound();
            }

            return gpsCoordinates;
        }



        // POST: api/GPS
        [HttpPost]
        public async Task<ActionResult<GPSCoordinates>> PostGPSCoordinates(GPSCoordinatesResource gpsCoortinates)
        {
            gpsCoortinates.TimeStamp=DateTime.Now;
            GPSCoordinates gpsDb = _mapper.Map<GPSCoordinates>(gpsCoortinates);
            gpsDb.CarId = gpsCoortinates.CarId;
            gpsDb.Car = await _context.Cars.FindAsync(gpsCoortinates.CarId);
            _context.GpsCoordinateses.Add(gpsDb);
            await _context.SaveChangesAsync();
            await _hub.Clients.All.SendAsync(gpsCoortinates);
            return CreatedAtAction("GetGPSCoordinates", new { id = gpsCoortinates.Id }, gpsCoortinates);
        }

        //[HttpPost]
        //[Route("/signalr")]
        //public IActionResult PostToSignalR()
        //{
        //    _hub.Clients.All.SendAsync("test");
        //    return Ok("send!");
        //}

    }
}
