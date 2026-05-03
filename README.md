# afrirates-api

> Open source API for live remittance exchange rates across African corridors.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

`afrirates-api` fetches live exchange rate data from [AfriRates.com](https://afrirates.com), stores it, and exposes it through a clean REST API — free for anyone to self-host or contribute to.

---

## Why this exists

Remittance rates change constantly and vary wildly across providers. AfriRates tracks these rates in real time, but there's no open API for developers to build on top of that data. This project fills that gap.

---

## Features

- ⚡ Live rates fetched every 15 minutes from AfriRates.com
- 🌍 Priority corridors: USD → NGN, GBP → KES, EUR → GHS
- 📈 Historical rate tracking with PostgreSQL
- 🔴 Redis caching for fast reads
- 🔔 Webhook support for rate-change alerts
- 🧩 Fully typed TypeScript monorepo (Turborepo)
- 🐳 Docker Compose for one-command local setup

---

## Supported corridors

| From | To | Country |
|------|----|---------|
| USD  | NGN | Nigeria |
| GBP  | KES | Kenya |
| EUR  | GHS | Ghana |

> More corridors coming soon. See [CONTRIBUTING.md](CONTRIBUTING.md) to add one.

---

## API reference

### Get latest rates

```
GET /api/rates?from=USD&to=NGN
```

**Response**
```json
{
  "from": "USD",
  "to": "NGN",
  "rate": 1610.50,
  "provider": "afrirates",
  "timestamp": "2026-05-03T12:00:00Z"
}
```

---

### Get rate history

```
GET /api/rates/history?from=GBP&to=KES&days=30
```

**Response**
```json
{
  "from": "GBP",
  "to": "KES",
  "history": [
    { "rate": 172.4, "timestamp": "2026-04-03T12:00:00Z" },
    { "rate": 173.1, "timestamp": "2026-04-04T12:00:00Z" }
  ]
}
```

---

### List supported corridors

```
GET /api/corridors
```

**Response**
```json
{
  "corridors": [
    { "from": "USD", "to": "NGN", "label": "US Dollar → Nigerian Naira" },
    { "from": "GBP", "to": "KES", "label": "British Pound → Kenyan Shilling" },
    { "from": "EUR", "to": "GHS", "label": "Euro → Ghanaian Cedi" }
  ]
}
```

---

### Register a webhook

```
POST /api/webhooks
Content-Type: application/json

{
  "url": "https://your-app.com/webhook",
  "corridor": { "from": "USD", "to": "NGN" },
  "threshold": 0.5
}
```

Triggered when the rate changes by more than `threshold` percent.

---

## Project structure

```
afrirates-api/
├── apps/
│   ├── web/              # Next.js app — API routes + dashboard
│   │   └── src/
│   │       ├── app/
│   │       │   └── api/  # Route handlers
│   │       └── lib/      # Shared utilities
│   └── scraper/          # Playwright scraper + cron scheduler
│       └── src/
├── packages/
│   ├── db/               # Prisma schema + migrations
│   └── types/            # Shared TypeScript types
├── docker-compose.yml
├── turbo.json
└── package.json
```

---

## Getting started

### Prerequisites

- Node.js 20+
- Docker + Docker Compose
- pnpm 9+

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/afrirates-api.git
cd afrirates-api
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your values (see [Environment variables](#environment-variables) below).

### 4. Start infrastructure

```bash
docker compose up -d
```

This starts PostgreSQL and Redis locally.

### 5. Run database migrations

```bash
pnpm db:migrate
```

### 6. Start development

```bash
pnpm dev
```

The API will be available at `http://localhost:3000/api`.

---

## Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/afrirates` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `SCRAPER_INTERVAL_MINUTES` | How often to fetch rates | `15` |
| `AFRIRATES_BASE_URL` | Source URL | `https://afrirates.com` |
| `WEBHOOK_SECRET` | Secret for signing webhook payloads | — |

---

## Contributing

Contributions are very welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for how to:

- Add a new corridor
- Improve the scraper
- Add a new data source
- Fix bugs

---

## Roadmap

- [ ] More corridors (XOF, ZAR, EGP, ETB)
- [ ] GraphQL endpoint
- [ ] Rate comparison across multiple providers
- [ ] Embeddable rate widget
- [ ] npm package for easy integration

---

## License

MIT © afrirates-api contributors
