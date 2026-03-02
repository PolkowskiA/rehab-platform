using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using RehabPlatform.API.Filters;
using RehabPlatform.API.Middleware;
using RehabPlatform.API.Validators;
using System.Text;
using System.Text.Json.Serialization;

namespace RehabPlatform.API.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApi(this IServiceCollection services, IConfiguration configuration)
    {
        var originsConfig = configuration["FRONTEND_ORIGINS"] ?? configuration["Frontend:AllowedOrigins"];
        if (string.IsNullOrWhiteSpace(originsConfig))
        {
            originsConfig = "http://localhost:5173,http://localhost:3001";
        }

        var origins = originsConfig
            .Split(',', StringSplitOptions.RemoveEmptyEntries)
            .Select(o => o.Trim())
            .ToArray();

        services.AddCors(options =>
        {
            options.AddPolicy("Frontend", policy =>
            {
                policy.WithOrigins(origins)
                    .AllowCredentials()
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });

        services.AddValidatorsFromAssemblyContaining<LoginRequestValidator>();

        services.AddScoped<FluentValidationFilter>();

        services.AddControllers(options =>
        {
            options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true;

            options.Filters.AddService<FluentValidationFilter>();
        })
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.Converters
                .Add(new JsonStringEnumConverter());
        });

        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        });

        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen(options =>
        {
            options.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                Description = "JWT Authorization header using the Bearer scheme."
            });
            options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
            {
                [new OpenApiSecuritySchemeReference("bearer", document)] = []
            });
        });

        return services;
    }

    public static WebApplication UseApiPipeline(this WebApplication app)
    {
        app.UseCors("Frontend");

        if (app.Services.GetService(typeof(Swashbuckle.AspNetCore.Swagger.ISwaggerProvider)) is not null)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "RehabPlatform API v1");
                c.ConfigObject.AdditionalItems["persistAuthorization"] = true;
            });
        }
        app.UseAuthentication();
        app.UseRouting();
        app.UseAuthorization();
        app.UseMiddleware<ExceptionHandlingMiddleware>();
        app.MapControllers();

        return app;
    }
}