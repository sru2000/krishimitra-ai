-- KrishiMitra AI · PostgreSQL schema

CREATE TABLE farmers (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  village      TEXT NOT NULL,
  district     TEXT NOT NULL,
  state        TEXT NOT NULL,
  acres        NUMERIC(6,2),
  crops        TEXT[],
  preferred_lang TEXT CHECK (preferred_lang IN ('en','te','hi')) DEFAULT 'en',
  phone        TEXT,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE field_visits (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id    UUID REFERENCES farmers(id) ON DELETE CASCADE,
  rep_id       UUID,
  visit_date   DATE NOT NULL,
  observations JSONB,
  risk_score   INTEGER,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE inventory (
  sku          TEXT PRIMARY KEY,
  product      TEXT NOT NULL,
  category     TEXT NOT NULL,
  stock        INTEGER NOT NULL,
  reorder      INTEGER NOT NULL,
  week_sales   INTEGER DEFAULT 0,
  updated_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE recommendations (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region       TEXT NOT NULL,
  crop         TEXT NOT NULL,
  title        TEXT NOT NULL,
  product      TEXT,
  reason       TEXT NOT NULL,
  confidence   NUMERIC(4,3),
  urgency      TEXT CHECK (urgency IN ('low','medium','high','critical')),
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_visits_farmer ON field_visits(farmer_id);
CREATE INDEX idx_recs_region   ON recommendations(region);
CREATE INDEX idx_recs_urgency  ON recommendations(urgency);
