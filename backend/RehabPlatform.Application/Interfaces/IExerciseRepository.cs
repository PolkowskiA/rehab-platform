using RehabPlatform.Domain.Entities;

namespace RehabPlatform.Application.Interfaces
{
    public interface IExerciseRepository
    {
        Task<Exercise?> GetByIdAsync(Guid id);

        Task<IReadOnlyCollection<Exercise>> GetByUserIdAsync(Guid userId);

        Task UpdateAsync(Exercise exercise);
    }
}