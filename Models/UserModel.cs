using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Backend.Models
{
     public class UserModel
     {
          [Key]
          public int UserId { get; set; }
          public required string firstName { get; set; }
          public required string lastName { get; set; }
          public required string email { get; set; }
          public required string password { get; set; }

     }
     public class UserCredentials
     {
          [Required]
          public string email { get; set; }

          [Required]
          public string password { get; set; }
     }
}