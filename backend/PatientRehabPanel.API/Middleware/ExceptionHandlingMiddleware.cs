using RehabPlatform.Domain.Exceptions;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text.Json;

namespace RehabPlatform.API.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (DomainException ex)
            {
                await HandleAsync(context, HttpStatusCode.Conflict, "DOMAIN_ERROR", ex.Message);
            }
            catch (ValidationException ex)
            {
                await HandleAsync(context, HttpStatusCode.BadRequest, "VALIDATION_ERROR", ex.Message);
            }
            catch (UnauthorizedAccessException ex)
            {
                await HandleAsync(context, HttpStatusCode.Unauthorized, "UNAUTHORIZED", ex.Message);
            }
            catch (Exception e)
            {
                await HandleAsync(context, HttpStatusCode.InternalServerError, "INTERNAL_ERROR", "Unexpected error occurred.");
            }
        }

        private static async Task HandleAsync(
            HttpContext context,
            HttpStatusCode statusCode,
            string code,
            string message)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            var response = new
            {
                code,
                message
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}