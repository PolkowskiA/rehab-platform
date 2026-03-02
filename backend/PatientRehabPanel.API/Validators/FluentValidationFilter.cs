using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Collections;
using System.Linq;

namespace RehabPlatform.API.Filters;

public sealed class FluentValidationFilter : IAsyncActionFilter
{
    private readonly IServiceProvider _provider;

    public FluentValidationFilter(IServiceProvider provider)
    {
        _provider = provider;
    }

    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
        foreach (var argument in context.ActionArguments.Values)
        {
            if (argument is null)
                continue;

            var argumentType = argument.GetType();
            var genericValidatorType = typeof(IValidator<>).MakeGenericType(argumentType);
            var enumerableValidatorType = typeof(IEnumerable<>).MakeGenericType(genericValidatorType);

            var services = _provider.GetService(enumerableValidatorType) as IEnumerable;
            if (services == null)
                continue;

            IValidator? matchedValidator = null;
            foreach (var svc in services)
            {
                if (svc is IValidator validator && validator.CanValidateInstancesOfType(argumentType))
                {
                    matchedValidator = validator;
                    break;
                }
            }

            if (matchedValidator is null)
                continue;

            var validationContext = new ValidationContext<object>(argument);
            var result = await matchedValidator.ValidateAsync(validationContext);

            if (!result.IsValid)
            {
                var errors = result.Errors
                    .GroupBy(e => e.PropertyName)
                    .ToDictionary(
                        g => g.Key,
                        g => g.Select(e => e.ErrorMessage).ToArray()
                    );

                context.Result = new BadRequestObjectResult(
                    new Validators.ValidationErrorResponse("VALIDATION_ERROR", errors)
                );

                return;
            }
        }

        await next();
    }
}