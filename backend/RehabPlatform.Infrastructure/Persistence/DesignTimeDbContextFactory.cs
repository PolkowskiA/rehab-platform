using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Text;

namespace RehabPlatform.Infrastructure.Persistence
{
    public class DesignTimeDbContextFactory
     : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

            optionsBuilder.UseSqlite("Data Source=rehab.db");

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}