using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
namespace Backend.Services
{
     public class CartService
     {
          private readonly AppDbContext _context;

          // Inject AppDbContext into the constructor
          public CartService(AppDbContext context)
          {
               _context = context;
          }

          public async Task<CartModel> AddToCart(int productId, int quantity, int userId)
          {
               var product = await _context.Product.FindAsync(productId);
               if (product == null)
               {
                    throw new ArgumentException("Product not found");
               }

               var cartItem = new CartModel
               {
                    ProductId = productId,
                    Quantity = quantity,
                    UserId = userId,
                    // Product = product // Ensure Product is set
               };

               _context.Cart.Add(cartItem);
               await _context.SaveChangesAsync();
               return cartItem;
          }


          public async Task<List<CartModel>> GetCartItems(int userId)
          {

               var cartItems = await _context.Cart
                   .Where(c => c.UserId == userId)
                   .Include(c => c.Product)  // This will include related Product data
                   .ToListAsync();

               return cartItems;
          }


          public async Task DeleteCartItem(int cartId, int userId)
          {
               // Fetch the product (or cart item) using cartId
               var cartItem = await _context.Cart
                   .Where(c => c.CartId == cartId && c.UserId == userId)
                   .FirstOrDefaultAsync();

               if (cartItem == null)
               {
                    throw new ArgumentException("Cart item not found.");
               }

               // Remove the cart item from the Cart table
               _context.Cart.Remove(cartItem);
               await _context.SaveChangesAsync();


          }

     }
}
