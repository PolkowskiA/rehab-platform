using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RehabPlatform.API.DTOs;
using RehabPlatform.API.Middleware;
using RehabPlatform.Application.Interfaces;
using RehabPlatform.Domain.Entities;
using System.Security.Claims;

namespace RehabPlatform.API.Controllers
{
    [ApiController]
    [Route("me")]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = GetUserId();

            var user = await _userService.GetByIdAsync(userId);

            var response = new UserResponse(
                user.Id,
                user.FirstName,
                user.LastName,
                user.Email
            );

            return Ok(response);
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateUserRequest request)
        {
            var userId = GetUserId();

            await _userService.UpdateProfileAsync(
                userId,
                request.FirstName,
                request.LastName
            );

            return NoContent();
        }

        private Guid GetUserId()
        {
            var claim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (claim is null)
                throw new UnauthorizedAccessException("Invalid token.");

            return Guid.Parse(claim.Value);
        }
    }
}