using Microsoft.EntityFrameworkCore;
using RehabPlatform.Application.Interfaces;
using RehabPlatform.Domain.Entities;
using RehabPlatform.Infrastructure.Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace RehabPlatform.Infrastructure.Repositories
{
    internal class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByEmailAsync(string email)
            => await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);

        public async Task<User?> GetByIdAsync(Guid id)
            => await _context.Users.FindAsync(id);

        public async Task AddAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}