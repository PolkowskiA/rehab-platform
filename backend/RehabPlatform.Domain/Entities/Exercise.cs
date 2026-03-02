using RehabPlatform.Domain.Enums;

namespace RehabPlatform.Domain.Entities
{
    public class Exercise
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public string DeviceName { get; private set; }
        public int DurationSeconds { get; private set; }
        public int Load { get; private set; }
        public ExerciseStatus Status { get; private set; }
        public DateTime? StartedAt { get; private set; }
        public DateTime? FinishedAt { get; private set; }

        private Exercise()
        { }

        public Exercise(Guid userId, string deviceName, int durationSeconds, int load)
        {
            if (userId == Guid.Empty)
                throw new ArgumentException("UserId cannot be empty.");

            if (string.IsNullOrWhiteSpace(deviceName))
                throw new ArgumentException("DeviceName is required.");

            if (durationSeconds <= 0)
                throw new ArgumentException("Duration must be greater than zero.");

            if (load <= 0)
                throw new ArgumentException("Load must be greater than zero.");

            Id = Guid.NewGuid();
            UserId = userId;
            DeviceName = deviceName;
            DurationSeconds = durationSeconds;
            Load = load;
            Status = ExerciseStatus.Todo;
        }

        public void Start()
        {
            if (Status != ExerciseStatus.Todo)
                throw new InvalidOperationException("Exercise cannot be started.");

            Status = ExerciseStatus.InProgress;
            StartedAt = DateTime.UtcNow;
        }

        public void Finish()
        {
            if (Status != ExerciseStatus.InProgress)
                throw new InvalidOperationException("Exercise cannot be finished.");

            Status = ExerciseStatus.Completed;
            FinishedAt = DateTime.UtcNow;
        }
    }
}