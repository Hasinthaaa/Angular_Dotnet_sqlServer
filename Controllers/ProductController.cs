using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;

namespace Backend.Controllers
{
     [Route("api/[controller]")]
     [ApiController]
     public class ProductsController : ControllerBase
     {
          private readonly ProductService _productService;

          // Inject ProductService into the controller
          public ProductsController(ProductService productService)
          {
               _productService = productService;
          }

          // GET: api/products
          [HttpGet]
          public ActionResult<List<ProductModel>> GetProducts()
          {
               var products = _productService.GetData();
               return Ok(products);
          }
     }
}
