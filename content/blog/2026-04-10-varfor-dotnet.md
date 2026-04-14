---
title: Varför jag fortfarande älskar .NET
date: 2026-04-10
tags: [dotnet, csharp, backend]
summary: Efter nästan tio år med .NET-plattformen är jag mer entusiastisk än någonsin. Här är varför.
---

# Varför jag fortfarande älskar .NET

Det har gått snart tio år sedan jag skrev min första rad C#. Sedan dess har plattformen förändrats enormt — från det Windows-låsta .NET Framework till det moderna, cross-platform .NET vi har idag.

## Prestanda som imponerar

.NET har blivit otroligt snabbt. Med varje ny release ser vi förbättringar i allt från garbage collection till JIT-kompilering. Kestrel-servern tävlar med de snabbaste webbservrarna på marknaden.

```csharp
// Minimal API i .NET 8 — elegant och snabbt
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/api/hello", () => Results.Ok(new { message = "Hej från .NET!" }));

app.Run();
```

## Ekosystemet

NuGet har mognat enormt. Entity Framework Core är ett fantastiskt ORM. Och med verktyg som **Aspire** blir det enklare än någonsin att bygga distribuerade system.

## Sammanfattning

.NET anno 2026 är en plattform som levererar på alla fronter — prestanda, utvecklarupplevelse och ekosystem. Jag ser fram emot vad som kommer härnäst.
