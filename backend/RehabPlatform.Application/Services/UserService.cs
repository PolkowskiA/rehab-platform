using BCrypt.Net;
using RehabPlatform.Application.Interfaces;
using RehabPlatform.Domain.Entities;
using RehabPlatform.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Text;

namespace RehabPlatform.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Guid> CreateUserAsync(string firstName, string lastName, string email, string password)
        {
            var existing = await _userRepository.GetByEmailAsync(email);

            if (existing is not null)
                throw new DomainException("User with this email already exists.");

            var user = new User(
                firstName,
                lastName,
                email,
                BCrypt.Net.BCrypt.HashPassword(password)
            );

            await _userRepository.AddAsync(user);

            return user.Id;
        }

        public async Task<User> GetByIdAsync(Guid userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            if (user is null)
                throw new DomainException("User not found.");

            return user;
        }

        public async Task UpdateProfileAsync(Guid userId, string firstName, string lastName)
        {
            var user = await GetByIdAsync(userId);

            user.UpdateProfile(firstName, lastName);

            await _userRepository.UpdateAsync(user);
        }
    }
}