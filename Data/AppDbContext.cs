using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace Backend.Data
{
     public class AppDbContext : DbContext

     {
               public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

               // Define your database tables here
               public DbSet<Models.ProductModel> Product { get; set; }
          }
     }


