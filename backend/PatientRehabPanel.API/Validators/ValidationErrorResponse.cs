namespace RehabPlatform.API.Validators
{
    public sealed record ValidationErrorResponse(
     string Code,
     Dictionary<string, string[]> Errors);
}