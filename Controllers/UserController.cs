using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn([FromBody] UserCredentials userCredentials)
        {
            if (userCredentials == null || string.IsNullOrWhiteSpace(userCredentials.email) || string.IsNullOrWhiteSpace(userCredentials.password))
            {
                return BadRequest("Invalid login credentials.");
            }

            var token = await _userService.SignInAsync(userCredentials.email, userCredentials.password);

            if (token == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(new { Token = token, Message = "Login successful" });
        }

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp([FromBody] UserModel user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.firstName) ||
                string.IsNullOrWhiteSpace(user.lastName) ||
                string.IsNullOrWhiteSpace(user.email) ||
                string.IsNullOrWhiteSpace(user.password))
            {
                return BadRequest("All fields are required.");
            }

            var result = await _userService.SignUpAsync(user);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            return Ok(new { Message = "User registered successfully" });
        }




    }
}
