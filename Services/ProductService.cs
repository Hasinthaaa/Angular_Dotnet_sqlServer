using Backend.Data;
using Backend.Models;
using System.Collections.Generic;

namespace Backend.Services
{
    public class ProductService
    {

        private readonly AppDbContext _context;

        // Inject AppDbContext into the constructor
        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        // Retrieve data from the database
        public List<ProductModel> GetData()
        {
            // Query the Product table from the database and return the result as a list
            return _context.Product.ToList(); // Assumes you have a DbSet<ProductModel> in AppDbContext
        }
    }



}