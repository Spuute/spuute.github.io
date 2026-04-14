---
title: Från monolit till mikrotjänster — lärdomar från verkligheten
date: 2026-02-15
tags: [arkitektur, mikrotjänster, azure]
summary: Vår resa från en monolitisk .NET-applikation till mikrotjänster i Azure. Vad som gick bra och vad vi lärde oss den hårda vägen.
---

# Från monolit till mikrotjänster

Det låter enkelt i teorin: bryt upp monoliten i små, oberoende tjänster. I praktiken är det betydligt mer nyanserat.

## Varför vi bytte

Vår monolit hade vuxit sig stor. Deployments tog lång tid, och en bugg i en modul kunde ta ner hela systemet. Vi behövde kunna skala enskilda delar oberoende av varandra.

## Vad som gick bra

- **Azure Service Bus** för asynkron kommunikation — detta var en game-changer
- **Separata databaser per tjänst** tvingade oss att tänka på domängränser
- **Feature teams** kunde deploya oberoende

## Vad vi underskattade

- **Distribuerad tracing** — utan det är felsökning en mardröm. Vi implementerade OpenTelemetry i efterhand
- **Data-konsistens** — eventual consistency kräver ett annat mindset
- **Komplexiteten i drift** — Kubernetes löser mycket, men skapar också nya problem

## Slutsats

Mikrotjänster är inte alltid svaret. Men för rätt problem, i rätt skala, är det kraftfullt. Börja med en välstrukturerad monolit och bryt ut tjänster när behovet uppstår.
