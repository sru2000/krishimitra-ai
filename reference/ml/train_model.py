"""
XGBoost training pipeline for KrishiMitra AI.
Features: rainfall, humidity, pest_risk, crop_type, inventory, sales, growth_stage
Outputs: demand_prediction, risk_level, priority_score
"""
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import xgboost as xgb
import joblib

def preprocess(df: pd.DataFrame):
    df = df.copy()
    for col in ["crop_type", "growth_stage"]:
        df[col] = LabelEncoder().fit_transform(df[col].astype(str))
    return df

def train(data_path: str = "data/field_history.csv", out_path: str = "models/krishimitra.json"):
    df = pd.read_csv(data_path)
    df = preprocess(df)
    X = df.drop(columns=["demand", "risk_level", "priority_score"])
    y = df["priority_score"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = xgb.XGBRegressor(n_estimators=400, max_depth=6, learning_rate=0.05)
    model.fit(X_train, y_train, eval_set=[(X_test, y_test)], verbose=False)
    print(f"R² on test: {model.score(X_test, y_test):.3f}")
    model.save_model(out_path)
    joblib.dump(model, out_path.replace(".json", ".pkl"))
    print(f"Saved → {out_path}")

if __name__ == "__main__":
    train()
