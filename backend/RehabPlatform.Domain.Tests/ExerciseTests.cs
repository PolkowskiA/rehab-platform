using FluentAssertions;
using RehabPlatform.Domain.Entities;
using RehabPlatform.Domain.Enums;
using RehabPlatform.Domain.Exceptions;

namespace RehabPlatform.Domain.Tests;

public class ExerciseTests
{
    private static Exercise CreateExercise()
        => new Exercise(Guid.NewGuid(), "Rotor", 15);

    [Fact]
    public void Start_Should_Change_Status_To_InProgress()
    {
        var exercise = CreateExercise();

        exercise.Start();

        exercise.Status.Should().Be(ExerciseStatus.InProgress);
        exercise.StartedAt.Should().NotBeNull();
    }

    [Fact]
    public void Finish_Should_Change_Status_To_Completed()
    {
        var exercise = CreateExercise();
        exercise.Start();

        exercise.Finish();

        exercise.Status.Should().Be(ExerciseStatus.Completed);
        exercise.FinishedAt.Should().NotBeNull();
    }

    [Fact]
    public void Start_Should_Throw_When_Already_Completed()
    {
        var exercise = CreateExercise();
        exercise.Start();
        exercise.Finish();

        var action = () => exercise.Start();

        action.Should().Throw<DomainException>();
    }

    [Fact]
    public void Finish_Should_Throw_When_Not_InProgress()
    {
        var exercise = CreateExercise();

        var action = () => exercise.Finish();

        action.Should().Throw<DomainException>();
    }
}