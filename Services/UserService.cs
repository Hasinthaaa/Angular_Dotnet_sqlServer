using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;

namespace Backend.Services
{
     public class UserService
     {
          private readonly AppDbContext _dbContext;
          private readonly JwtService _jwtService;

          public UserService(AppDbContext dbContext, JwtService jwtService)
          {
               _dbContext = dbContext;
               _jwtService = jwtService;
          }

          // // User authentication (SignIn)
          // public async Task<string?> SignInAsync(string email, string password)
          // {
          //      var user = await _dbContext.User.FirstOrDefaultAsync(u => u.email == email);

          //      if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.password)) // Hash password check
          //      {
          //           return null; // Authentication failed
          //      }

          //      return _jwtService.GenerateToken(user); // Generate JWT token
          // }


          public async Task<string?> SignInAsync(string email, string password)
          {
               var user = await _dbContext.User.FirstOrDefaultAsync(u => u.email == email);

               if (user == null)
               {
                    return null; // User not found
               }

               // Debugging: Log stored and entered passwords (DO NOT use in production)
               Console.WriteLine($"Stored Hash: {user.password}");
               Console.WriteLine($"Entered Password: {password}");

               // Check if the hashed password matches
               bool isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.password);
               Console.WriteLine($"isPasswordValid: {isPasswordValid}");


               if (!isPasswordValid)
               {
                    Console.WriteLine($"GenerateToken: ");

                    return null; // Authentication failed
               }
               Console.WriteLine($"GenerateToken: ");


               Console.WriteLine($"GenerateToken: {_jwtService.GenerateToken(user)}");


               return _jwtService.GenerateToken(user); // Generate JWT token
          }




          public async Task<(bool Success, string Message)> SignUpAsync(UserModel user)
          {
               // Check if email is already registered
               var existingUser = await _dbContext.User.FirstOrDefaultAsync(u => u.email == user.email);
               if (existingUser != null)
               {
                    return (false, "Email is already registered.");
               }

               // Hash the password before saving
               user.password = BCrypt.Net.BCrypt.HashPassword(user.password);

               // Add user to the database
               await _dbContext.User.AddAsync(user);
               await _dbContext.SaveChangesAsync();

               return (true, "User registered successfully.");
          }


     }
}
