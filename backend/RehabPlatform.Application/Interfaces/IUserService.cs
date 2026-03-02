using RehabPlatform.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RehabPlatform.Application.Interfaces
{
    public interface IUserService
    {
        Task<User> GetByIdAsync(Guid userId);

        Task UpdateProfileAsync(Guid userId, string firstName, string lastName);

        Task<Guid> CreateUserAsync(string firstName, string lastName, string email, string password);
    }
}