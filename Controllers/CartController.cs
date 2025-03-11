using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService _cartService;

        // Inject CartService into the controller
        public CartController(CartService cartService)
        {
            _cartService = cartService;
        }

        // POST: api/cart/AddToCart
        [HttpPost("AddToCart")]
        public async Task<IActionResult> AddToCart([FromBody] CartModel cartItem)
        {
            
            if (cartItem == null)
            {
                return BadRequest("Invalid cart item data");
            }

            await _cartService.AddToCart(cartItem.ProductId, cartItem.Quantity, cartItem.UserId);
            return Ok("Item added to cart successfully");
        }


        // GET: api/cart
        [HttpGet()]
        public async Task<IActionResult> GetCartItems(int userId)
        {
            var cartItems = await _cartService.GetCartItems(userId);
            return Ok(cartItems);
        }

        // DELETE: api/cart/DeleteCartItem
        [HttpDelete("DeleteCartItem")]
        public async Task<IActionResult> DeleteCartItem([FromBody] CartModel cartItem)
        {
            await _cartService.DeleteCartItem(cartItem.CartId, cartItem.UserId);
            return NoContent();
        }
    }
}
