#!/usr/bin/env python3
"""
Script to create a dummy trained model for development purposes.
This creates a simple logistic regression model with dummy data.
"""

import numpy as np
import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
import os

def create_dummy_model():
    """Create a dummy model for development purposes"""
    
    # Create dummy training data
    # Features: [loan_amount, loan_term, annual_income, credit_score, employment_years, 
    #           debt_to_income_ratio, loan_to_income_ratio, age, existing_loans]
    np.random.seed(42)
    n_samples = 1000
    
    X = np.random.rand(n_samples, 9)
    # Scale features to realistic ranges
    X[:, 0] = X[:, 0] * 500000 + 5000  # loan_amount: 5k-505k
    X[:, 1] = X[:, 1] * 354 + 6        # loan_term: 6-360 months
    X[:, 2] = X[:, 2] * 200000 + 30000 # annual_income: 30k-230k
    X[:, 3] = X[:, 3] * 350 + 300      # credit_score: 300-650
    X[:, 4] = X[:, 4] * 40              # employment_years: 0-40
    X[:, 5] = X[:, 5] * 0.8             # debt_to_income_ratio: 0-0.8
    X[:, 6] = X[:, 6] * 10              # loan_to_income_ratio: 0-10
    X[:, 7] = X[:, 7] * 50 + 18         # age: 18-68
    X[:, 8] = X[:, 8] * 5               # existing_loans: 0-5
    
    # Create target variable (0 = no default, 1 = default)
    # Higher risk for: high debt ratios, low credit scores, high loan amounts
    risk_factors = (
        (X[:, 5] > 0.5) +  # high debt-to-income
        (X[:, 3] < 500) +  # low credit score
        (X[:, 6] > 5) +    # high loan-to-income
        (X[:, 4] < 2)      # low employment years
    )
    
    # Convert to probability and then binary outcome
    default_prob = risk_factors / 4.0 + np.random.normal(0, 0.1, n_samples)
    y = (default_prob > 0.5).astype(int)
    
    # Create and train the model
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    model = LogisticRegression(random_state=42)
    model.fit(X_scaled, y)
    
    # Create trained_model directory if it doesn't exist
    model_dir = os.path.join(os.path.dirname(__file__), 'trained_model')
    os.makedirs(model_dir, exist_ok=True)
    
    # Save the model and scaler
    model_path = os.path.join(model_dir, 'model.pkl')
    scaler_path = os.path.join(model_dir, 'scaler.pkl')
    
    joblib.dump(model, model_path)
    joblib.dump(scaler, scaler_path)
    
    print(f"✅ Dummy model saved to {model_path}")
    print(f"✅ Scaler saved to {scaler_path}")
    print(f"📊 Model accuracy on training data: {model.score(X_scaled, y):.3f}")
    
    # Test the model with sample data
    sample_features = np.array([[50000, 60, 75000, 650, 5, 0.3, 0.67, 30, 1]])
    sample_scaled = scaler.transform(sample_features)
    risk_score = model.predict_proba(sample_scaled)[0, 1]
    print(f"🧪 Sample prediction - Risk score: {risk_score:.3f}")

if __name__ == '__main__':
    create_dummy_model()