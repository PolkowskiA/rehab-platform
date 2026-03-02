using FluentValidation;
using RehabPlatform.API.DTOs;

namespace RehabPlatform.API.Validators
{
    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty()
                .EmailAddress()
                .Matches(@"^[^@\s]+@[^@\s]+\.[^@\s]+$")
                .WithMessage("Email must be a valid email address.");

            RuleFor(x => x.Password)
                .NotEmpty();
        }
    }
}