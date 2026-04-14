---
title: 5 Docker-tips för .NET-utvecklare
date: 2026-03-22
tags: [docker, devops, dotnet]
summary: Praktiska tips som gör dina .NET Docker-images mindre, snabbare och säkrare.
---

# 5 Docker-tips för .NET-utvecklare

Docker är en självklar del av moderna .NET-projekt. Här är fem tips jag önskar att jag kände till från dag ett.

## 1. Använd multi-stage builds

Separera build och runtime för mycket mindre images:

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "MyApp.dll"]
```

## 2. Cacha NuGet-restore separat

Genom att kopiera `.csproj` först och köra `dotnet restore` innan resten av koden kopieras utnyttjar du Dockers layer-cache optimalt.

## 3. Kör som non-root

```dockerfile
RUN adduser --disabled-password appuser
USER appuser
```

## 4. Använd .dockerignore

Exkludera `bin/`, `obj/`, `.git/` och andra onödiga filer för snabbare builds.

## 5. Health checks

```dockerfile
HEALTHCHECK CMD curl --fail http://localhost:8080/health || exit 1
```

Dessa små förändringar gör stor skillnad i produktion.
