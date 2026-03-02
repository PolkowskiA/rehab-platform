FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# copy entire project context (dockerignore will exclude bin/obj) so referenced projects are available
COPY . .

# restore and publish the API project in PatientRehabPanel.API folder
RUN dotnet restore "PatientRehabPanel.API/RehabPlatform.API.csproj"
RUN dotnet publish "PatientRehabPanel.API/RehabPlatform.API.csproj" -c Release -o /app/publish /p:GenerateRuntimeConfigurationFiles=true

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80
ENTRYPOINT ["dotnet", "RehabPlatform.API.dll"]
