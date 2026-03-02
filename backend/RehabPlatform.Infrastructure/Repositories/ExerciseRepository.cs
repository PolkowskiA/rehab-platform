using Microsoft.EntityFrameworkCore;
using RehabPlatform.Application.Interfaces;
using RehabPlatform.Domain.Entities;
using RehabPlatform.Infrastructure.Persistence;

namespace RehabPlatform.Infrastructure.Repositories
{
    public class ExerciseRepository : IExerciseRepository
    {
        private readonly AppDbContext _context;

        public ExerciseRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Exercise?> GetByIdAsync(Guid id)
            => await _context.Exercises.FindAsync(id);

        public async Task<IReadOnlyCollection<Exercise>> GetByUserIdAsync(Guid userId)
            => await _context.Exercises
                .Where(e => e.UserId == userId)
                .ToListAsync();

        public async Task UpdateAsync(Exercise exercise)
        {
            _context.Exercises.Update(exercise);
            await _context.SaveChangesAsync();
        }
    }
}