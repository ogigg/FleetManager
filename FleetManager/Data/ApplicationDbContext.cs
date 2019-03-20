using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FleetManager.Models;
using Microsoft.EntityFrameworkCore;

namespace FleetManager.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
            
        }

        public DbSet<GPSCoordinates> GpsCoordinateses { get; set; }
        public DbSet<Car> Cars { get; set; }

    }
}
