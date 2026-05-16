"""
KrishiMitra AI — FastAPI backend (reference).
Run: uvicorn reference.backend.main:app --reload
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="KrishiMitra AI", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

class AnalyzeRequest(BaseModel):
    region: str
    crop: str
    rainfall: float
    humidity: float
    temp: float
    pest_risk: float
    inventory: int
    sales: int
    growth_stage: str

class Recommendation(BaseModel):
    title: str
    product: Optional[str]
    reason: str
    confidence: float
    urgency: str

@app.post("/analyze", response_model=Recommendation)
def analyze(req: AnalyzeRequest):
    # Rule + ML hybrid (see ml/inference.py)
    if req.humidity > 80 and req.pest_risk > 70:
        return Recommendation(
            title="Apply systemic fungicide",
            product="Amistar Top 325 SC",
            reason=f"Humidity at {req.humidity}% combined with pest risk {req.pest_risk} signals high fungal co-infection probability.",
            confidence=0.92, urgency="critical",
        )
    if req.inventory < 100 and req.sales > 60:
        return Recommendation(title="Trigger reorder", product=None,
            reason="Stock below reorder threshold with active weekly sales velocity.",
            confidence=0.88, urgency="high")
    return Recommendation(title="Monitor", product=None,
        reason="Conditions within normal parameters.", confidence=0.7, urgency="low")

@app.get("/priority")
def priority():
    return [
        {"region": "Guntur", "score": 94, "risk": "critical"},
        {"region": "Warangal", "score": 87, "risk": "high"},
    ]

@app.get("/farmers")
def list_farmers():
    return []  # see database/schema.sql

@app.get("/inventory")
def list_inventory():
    return []

@app.get("/recommendations")
def list_recommendations():
    return []

@app.post("/predict")
def predict(req: AnalyzeRequest):
    from reference.ml.inference import predict_demand_and_risk
    return predict_demand_and_risk(req.dict())
