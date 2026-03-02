using Microsoft.EntityFrameworkCore;
using RehabPlatform.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RehabPlatform.Infrastructure.Persistence
{
    public static class DatabaseSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            if (await context.Users.AnyAsync())
                return;

            var user1 = new User(
                "Klaudia",
                "Nowak",
                "nowak@example.com",
                BCrypt.Net.BCrypt.HashPassword("Password123!")
            );

            var user2 = new User(
                "Anna",
                "Jastrzębska",
                "anna@example.com",
                BCrypt.Net.BCrypt.HashPassword("Password123!")
            );

            var user3 = new User(
                "Michał",
                "Kamiński",
                "michal@example.com",
                BCrypt.Net.BCrypt.HashPassword("Password123!")
            );

            await context.Users.AddRangeAsync(user1, user2, user3);

            var exercises = new List<Exercise>();

            var users = new[] { user1, user2, user3 };

            var deviceNames = new[]
            {
                "Rotator kończyn górnych",
                "Rotator kończyn dolnych",
                "Urządzenie do wyprostu ramion",
                "Symulator wyciskania nóg",
                "Trenażer siły chwytu"
            };

            int counter = 0;

            foreach (var user in users)
            {
                for (int i = 0; i < 3; i++)
                {
                    exercises.Add(new Exercise(
                        user.Id,
                        deviceNames[counter % deviceNames.Length],
                        new Random().Next(10, 21) * 60,
                        new Random().Next(20, 101) * 1000
                    ));

                    counter++;
                }
            }

            await context.Exercises.AddRangeAsync(exercises);

            await context.SaveChangesAsync();
        }
    }
}