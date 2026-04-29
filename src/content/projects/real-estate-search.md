---
title: Real Estate Search with LLM
description: Plataforma full stack para búsqueda inmobiliaria usando lenguaje natural. Integra Groq (LLM cloud) para traducir consultas en texto a filtros SQL sobre PostgreSQL.
github: "https://github.com/aogallo/real_estate_seach"
liveLink: "https://real-estate-seach.vercel.app/"
draft: false
pubDatetime: 2025-01-20
tags:
  - React
  - FastAPI
  - PostgreSQL
  - Groq
  - AI
  - TypeScript
  - Docker
  - SQLAlchemy
---

Plataforma de búsqueda inmobiliaria que permite buscar propiedades utilizando lenguaje natural como "Muéstrame casas de 3 habitaciones en Guatemala City".

## Stack Tecnológico

- **Frontend**: ReactJS + Vite + Axios
- **Backend**: FastAPI + SQLAlchemy
- **Base de Datos**: PostgreSQL con migraciones Alembic
- **IA**: Groq (LLM cloud)

## Arquitectura

```
API → Service → Repository → Database
```

El backend expone endpoints REST donde el servicio se encarga de la lógica de negocio e integración con Groq para interpretar lenguaje natural.
