using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FleetManager.Data;
using FleetManager.Models;

namespace FleetManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GPSController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GPSController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/GPS
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GPSCoordinates>>> GetAllGpsCoordinateses()
        {
            return await _context.GpsCoordinateses.ToListAsync();
        }

        // GET: api/GPS/5
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
        public async Task<ActionResult<GPSCoordinates>> PostGPSCoordinates(GPSCoordinates gpsCoortinates)
        {
            gpsCoortinates.TimeStamp=DateTime.Now;
            _context.GpsCoordinateses.Add(gpsCoortinates);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetGPSCoordinates", new { id = gpsCoortinates.Id }, gpsCoortinates);
        }

    }
}
