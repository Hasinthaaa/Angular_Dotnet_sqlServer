using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Backend.Models
{
    public class ProductModel
    {
        [Key]
        public int ProductId { get; set; }
        public required string Description { get; set; }
        public required string Name { get; set; }
        public required string ImageName { get; set; }
        public required string Category { get; set; }

        [Column(TypeName = "decimal(18,2)")] // Explicitly define column type
        public decimal Price { get; set; }
        public float Discount { get; set; }
    }
}
