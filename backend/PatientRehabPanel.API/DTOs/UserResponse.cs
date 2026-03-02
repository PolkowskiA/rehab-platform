namespace RehabPlatform.API.DTOs
{
    public record UserResponse(
        Guid Id,
        string FirstName,
        string LastName,
        string Email
    );
}