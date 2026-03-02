using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RehabPlatform.API.DTOs;
using RehabPlatform.Application.Interfaces;
using System.Security.Claims;

namespace RehabPlatform.API.Controllers
{
    [ApiController]
    [Route("exercises")]
    [Authorize]
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseService _exerciseService;

        public ExerciseController(IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        private Guid GetUserId()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId is null)
                throw new UnauthorizedAccessException("User ID not found in token.");

            return Guid.Parse(userId);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var userId = GetUserId();
            var exercises = await _exerciseService.GetUserExercisesAsync(userId);

            var result = exercises
                .Select(e => new ExerciseResponse(
                    e.Id,
                    e.DeviceName,
                    (int)Math.Ceiling((double)e.DurationSeconds / 60),
                    (int)Math.Ceiling((double)e.Load / 1000),
                    e.Status,
                    e.StartedAt,
                    e.FinishedAt))
                .ToList();

            return Ok(result);
        }

        [HttpPost("{id:guid}/start")]
        public async Task<IActionResult> Start(Guid id)
        {
            var userId = GetUserId();
            await _exerciseService.StartAsync(userId, id);

            return NoContent();
        }

        [HttpPost("{id:guid}/finish")]
        public async Task<IActionResult> Finish(Guid id)
        {
            var userId = GetUserId();
            await _exerciseService.FinishAsync(userId, id);

            return NoContent();
        }
    }
}