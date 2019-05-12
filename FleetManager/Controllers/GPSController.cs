using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FleetManager.Data;
using FleetManager.Models;
using FleetManager.Resources;
using Microsoft.AspNetCore.Authorization;

namespace FleetManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GPSController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public GPSController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/GPS
        [Authorize]
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

            return CreatedAtAction("GetGPSCoordinates", new { id = gpsCoortinates.Id }, gpsCoortinates);
        }

    }
}
