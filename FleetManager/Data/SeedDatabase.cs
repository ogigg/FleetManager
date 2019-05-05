using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FleetManager.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace FleetManager.Data
{
    public class SeedDatabase
    {

        public static void Initialize(IServiceProvider serviceProvider)
        {
            var context = serviceProvider.GetRequiredService<ApplicationDbContext>();

            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
            context.Database.EnsureCreated();

            if (!context.Users.Any())
            {
                User user = new User
                {
                    Email = "admin@mail.com",
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = "Admin"
                };

                userManager.CreateAsync(user, "Password@123");
            }
        }
    }
}
