namespace RehabPlatform.API.DTOs
{
    public record UpdateUserRequest(
        string FirstName,
        string LastName
    );
}