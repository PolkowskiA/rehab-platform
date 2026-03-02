using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RehabPlatform.Infrastructure.Persistence;

namespace RehabPlatform.Infrastructure;

public static class SeedExtensions
{
    public static async Task SeedDataAsync(this WebApplication app)
    {
        using (var scope = app.Services.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            await context.Database.MigrateAsync();
            await DatabaseSeeder.SeedAsync(context);
        }
    }
}