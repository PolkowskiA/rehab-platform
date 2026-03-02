using RehabPlatform.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RehabPlatform.Application.Interfaces
{
    public interface IExerciseService
    {
        Task<IReadOnlyCollection<Exercise>> GetUserExercisesAsync(Guid userId);

        Task StartAsync(Guid userId, Guid exerciseId);

        Task FinishAsync(Guid userId, Guid exerciseId);
    }
}