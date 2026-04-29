---
title: Real Estate Search with LLM
description: Full stack real estate search platform using natural language. Integrates Groq (cloud LLM) to translate text queries into SQL filters over PostgreSQL.
image:
  url: /assets/real-estate-search.png
  alt: Real Estate Search with LLM interface
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
  - Alembic
---

Real estate search platform that allows searching properties using natural language like "Show me 3-bedroom houses in Guatemala City".

## Tech Stack

- **Frontend**: ReactJS + Vite + Axios
- **Backend**: FastAPI + SQLAlchemy
- **Database**: PostgreSQL with Alembic migrations
- **AI**: Groq (cloud LLM)

## Architecture

```
API → Service → Repository → Database
```

The backend exposes REST endpoints where the service handles business logic and integration with Groq to interpret natural language.
