using Microsoft.Extensions.DependencyInjection;
using RehabPlatform.Application.Interfaces;
using RehabPlatform.Application.Services;

namespace RehabPlatform.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(
        this IServiceCollection services)
    {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IExerciseService, ExerciseService>();

        return services;
    }
}