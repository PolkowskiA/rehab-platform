using RehabPlatform.API.Extensions;
using RehabPlatform.Application.Extensions;
using RehabPlatform.Infrastructure;
using RehabPlatform.Infrastructure.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddInfrastructure(builder.Configuration);

builder.Services.AddApplication();

builder.Services.AddApi(builder.Configuration);

var app = builder.Build();

app.UseApiPipeline();

await app.SeedDataAsync();

app.Run();