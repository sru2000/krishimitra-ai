"""Inference wrapper around the trained XGBoost model."""
import xgboost as xgb

_model = None

def _load():
    global _model
    if _model is None:
        _model = xgb.XGBRegressor()
        _model.load_model("models/krishimitra.json")
    return _model

def predict_demand_and_risk(features: dict) -> dict:
    m = _load()
    # In production: vectorize + encode features identical to train pipeline.
    score = float(m.predict([[features.get(k, 0) for k in [
        "rainfall", "humidity", "pest_risk", "crop_type",
        "inventory", "sales", "growth_stage",
    ]]])[0])
    return {
        "priority_score": round(score, 2),
        "risk_level": "critical" if score > 85 else "high" if score > 65 else "medium" if score > 40 else "low",
        "demand_forecast_units": int(score * 3.2),
    }
