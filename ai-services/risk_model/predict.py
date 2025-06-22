import joblib
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import joblib

app = Flask(__name__)
CORS(app)

# Load the trained model
model_path = os.path.join(os.path.dirname(__file__), 'trained_model/model.pkl')
scaler_path = os.path.join(os.path.dirname(__file__), 'trained_model/scaler.pkl')

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)

@app.route('/predict', methods=['POST'])
def predict_risk():
    data = request.json
    
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    try:
        # Extract features
        features = extract_features(data)
        
        # Scale features
        scaled_features = scaler.transform([features])
        
        # Make prediction
        risk_score = model.predict_proba(scaled_features)[0, 1]  # Probability of default
        risk_score = float(risk_score)  # Convert numpy float to Python float
        
        # Calculate risk category
        risk_category = categorize_risk(risk_score)
        
        return jsonify({
            'risk_score': risk_score,
            'risk_category': risk_category,
            'loan_id': data.get('loan_id')
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def extract_features(data):
    """Extract relevant features from loan and user data"""
    # Default values
    features = [
        data.get('loan_amount', 0),
        data.get('loan_term', 0),
        data.get('annual_income', 0),
        data.get('credit_score', 650),  # Default credit score
        data.get('employment_years', 0),
        data.get('debt_to_income_ratio', 0),
        data.get('loan_to_income_ratio', 0),
        data.get('age', 30),  # Default age
        data.get('existing_loans', 0)
    ]
    return features

def categorize_risk(risk_score):
    """Categorize risk score into risk levels"""
    if risk_score < 0.3:
        return 'Low'
    elif risk_score < 0.6:
        return 'Medium'
    else:
        return 'High'

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'risk-model'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8001))
    app.run(host='0.0.0.0', port=port, debug=True)