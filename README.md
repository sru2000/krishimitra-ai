# KrishiMitra AI · Field Force Intelligence

An AI-powered agricultural field intelligence platform built for Syngenta's **Field Force Intelligence** hackathon track. Helps field representatives make real-time decisions using weather, crop conditions, pest risk, inventory and sales signals.

## Live demo

The current deployment is the **production-quality frontend** (React + TanStack Start + Tailwind + Recharts + Framer Motion + React Leaflet), running on the edge.

### Pages

| Route          | Description                                                    |
| -------------- | -------------------------------------------------------------- |
| `/`            | Enterprise dashboard — KPIs, weather, crop mix, priority regions, AI recommendations |
| `/analytics`   | Deep analytics — pest decomposition radar, yield trends, product sales |
| `/farmers`     | Farmer directory + multilingual advisories (English / తెలుగు / हिन्दी) |
| `/inventory`   | Stock vs reorder, demand forecast, status ledger               |
| `/assistant`   | Conversational AI agent grounded in field telemetry            |
| `/regions`     | Live geospatial risk map (Leaflet) across AP & Telangana       |

## Reference architecture (full stack)

This repo also ships reference Python code in `reference/` showing how a full backend would look in production:

```
reference/
  backend/         FastAPI app — /analyze, /predict, /priority, /farmers, /inventory, /recommendations
  ml/              XGBoost training pipeline + inference
  database/        PostgreSQL schema (farmers, field_visits, inventory, recommendations)
  agent/           LangChain + CrewAI agent skeleton
```

The frontend uses rich mock data in `src/data/mockData.ts` modeled exactly after the API contracts in `reference/backend/`, so swapping the data layer for a live FastAPI host is a one-file change.

## AI recommendation logic

Encoded in `src/data/mockData.ts` and exercised across the dashboard + assistant:

- **High humidity + pest risk** → recommend fungicide (Amistar Top 325 SC)
- **Crop stage + rainfall** → contextual advisory (e.g. defer irrigation 48h)
- **Low inventory + high sales** → reorder alert with split-allocation suggestion

Every recommendation surfaces **explainable reasoning** + a confidence score.

## Stack

- **Frontend:** React 19, TanStack Start, Tailwind CSS v4, Recharts, Framer Motion, React Leaflet, Lucide
- **Reference backend:** FastAPI, SQLAlchemy, PostgreSQL
- **Reference ML:** XGBoost, Pandas, scikit-learn
- **Reference agent:** LangChain, CrewAI

## Local development

```bash
bun install
bun run dev
```

## Deployment

The frontend deploys to Cloudflare via Lovable Cloud / TanStack Start's edge build. The reference backend is `render.yaml`-ready.
