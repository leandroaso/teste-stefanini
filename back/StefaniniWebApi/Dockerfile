#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
EXPOSE 1434 

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["StefaniniWebApi/StefaniniWebApi.csproj", "StefaniniWebApi/"]
RUN dotnet restore "StefaniniWebApi/StefaniniWebApi.csproj"
COPY . .
WORKDIR "/src/StefaniniWebApi"
RUN dotnet build "StefaniniWebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "StefaniniWebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "StefaniniWebApi.dll"]