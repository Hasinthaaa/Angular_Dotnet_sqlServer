using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
     public class CartModel
     {
          [Key]
          public int CartId { get; set; }

          [Required]
          public int ProductId { get; set; }

          [ForeignKey("ProductId")]
          public ProductModel? Product { get; set; }

          [Required]
          public int Quantity { get; set; }

          [Required]
          public int UserId{get; set;}

          public DateTime DateAdded {get; set; }

     }
}