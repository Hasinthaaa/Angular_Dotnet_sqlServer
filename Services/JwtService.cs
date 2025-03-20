using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Backend.Models;

namespace Backend.Services
{
     public class JwtService
     {
          private readonly string _secretKey;
          private readonly int _tokenExpirationMinutes;

          public JwtService(IConfiguration config)
          {
               _secretKey = config["JwtSettings:Secret"] ?? throw new ArgumentNullException("JwtSettings:Secret is missing.");
               _tokenExpirationMinutes = int.Parse(config["JwtSettings:TokenExpirationMinutes"] ?? "60");
          }

          public string GenerateToken(UserModel user)
          {
               var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey)); // Ensure correct key size
               Console.WriteLine($"key: {key}");
               var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
               Console.WriteLine($"credentials: {credentials}");

               var claims = new[]
               {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Email, user.email)
        };

        Console.WriteLine($"claims: {claims}");

               var token = new JwtSecurityToken(
                   issuer: "Joes-Robot-Shop",
                   audience: "Joes-Robot-Shop",
                   claims: claims,
                   expires: DateTime.UtcNow.AddMinutes(_tokenExpirationMinutes),
                   signingCredentials: credentials
               );
               Console.WriteLine($"token: {token}");

               return new JwtSecurityTokenHandler().WriteToken(token);
          }
     }



}
