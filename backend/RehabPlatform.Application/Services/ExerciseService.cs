using RehabPlatform.Application.Interfaces;
using RehabPlatform.Domain.Entities;
using RehabPlatform.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;

namespace RehabPlatform.Application.Services
{
    public class ExerciseService : IExerciseService
    {
        private readonly IExerciseRepository _exerciseRepository;

        public ExerciseService(IExerciseRepository exerciseRepository)
        {
            _exerciseRepository = exerciseRepository;
        }

        public async Task<IReadOnlyCollection<Exercise>> GetUserExercisesAsync(Guid userId)
        {
            return await _exerciseRepository.GetByUserIdAsync(userId);
        }

        public async Task StartAsync(Guid userId, Guid exerciseId)
        {
            var exercise = await _exerciseRepository.GetByIdAsync(exerciseId)
                ?? throw new DomainException("Exercise not found.");

            if (exercise.UserId != userId)
                throw new UnauthorizedAccessException("Access denied.");

            exercise.Start();

            await _exerciseRepository.UpdateAsync(exercise);
        }

        public async Task FinishAsync(Guid userId, Guid exerciseId)
        {
            var exercise = await _exerciseRepository.GetByIdAsync(exerciseId)
                ?? throw new DomainException("Exercise not found.");

            if (exercise.UserId != userId)
                throw new UnauthorizedAccessException("Access denied.");

            exercise.Finish();

            await Task.Delay(3000); // simulate processing

            await _exerciseRepository.UpdateAsync(exercise);
        }
    }
}