using RehabPlatform.Domain.Enums;

namespace RehabPlatform.API.DTOs
{
    public record ExerciseResponse
    (
        Guid Id,
        string DeviceName,
        int Duration,
        int Load,
        ExerciseStatus Status,
        DateTime? StartedAt,
        DateTime? FinishedAt
    );
}