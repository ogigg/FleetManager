using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FleetManager.Models;
using FleetManager.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace TokenDemo.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private UserManager<User> userManager;

        public AuthController(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }


        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet]
        [Route("checkToken")]
        public IActionResult TestAuthorization()
        {
            return Ok("Authorized");
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await userManager.FindByNameAsync(model.Username);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub,user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("MySuperSecureKey"));

                var token = new JwtSecurityToken(
                    issuer: "http://oec.com",
                    audience: "http://oec.com",
                    expires: DateTime.UtcNow.AddHours(10),
                    claims: claims,
                    signingCredentials: new Microsoft.IdentityModel.Tokens.SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] LoginModel model)
        {
            User usr = await userManager.FindByNameAsync(model.Username);
            if (usr==null)
            {
                User user = new User()
                {
                    UserName = model.Username,
                };
                await userManager.AddPasswordAsync(user, model.Password);

                await userManager.CreateAsync(user);
                return Ok(user);
            }

            return Ok("User with this username already registered");

        }
    }
}