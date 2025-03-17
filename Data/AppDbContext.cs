using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
     public class AppDbContext : DbContext

     {
               public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

               // Define your database tables here
               public DbSet<Models.ProductModel> Product { get; set; }
               public DbSet<Models.CartModel> Cart {get; set; }
               public DbSet<Models.UserModel> User { get; set; }
          }
     }


