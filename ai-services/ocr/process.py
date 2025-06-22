import os
import json
import pytesseract
from PIL import Image
import requests
from io import BytesIO
from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import os

app = Flask(__name__)
CORS(app)

@app.route('/process', methods=['POST'])
def process_document():
    data = request.json
    document_id = data.get('documentId')
    document_type = data.get('documentType')
    file_url = data.get('fileUrl')
    
    if not all([document_id, document_type, file_url]):
        return jsonify({'error': 'Missing required parameters'}), 400
    
    try:
        # Download the image
        response = requests.get(file_url)
        img = Image.open(BytesIO(response.content))
        
        # Extract text using OCR
        text = pytesseract.image_to_string(img)
        
        # Process based on document type
        extracted_data = {}
        
        if document_type == 'id_proof':
            # Extract ID information
            extracted_data = extract_id_info(text)
        elif document_type == 'income_proof':
            # Extract income information
            extracted_data = extract_income_info(text)
        
        # Save results
        result = {
            'document_id': document_id,
            'document_type': document_type,
            'extracted_text': text,
            'extracted_data': extracted_data
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def extract_id_info(text):
    """Extract information from ID documents"""
    data = {}
    
    # Extract name
    name_match = re.search(r'Name[:\s]+(\w+\s+\w+)', text, re.IGNORECASE)
    if name_match:
        data['name'] = name_match.group(1)
    
    # Extract date of birth
    dob_match = re.search(r'(DOB|Date of Birth)[:\s]+(\d{1,2}[/\-]\d{1,2}[/\-]\d{2,4})', text, re.IGNORECASE)
    if dob_match:
        data['date_of_birth'] = dob_match.group(2)
    
    # Extract ID number
    id_match = re.search(r'(ID|License)[:\s#]+(\w+\d+\w*)', text, re.IGNORECASE)
    if id_match:
        data['id_number'] = id_match.group(2)
    
    return data

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'ocr-service'})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port, debug=True)

def extract_income_info(text):
    """Extract information from income documents"""
    data = {}
    
    # Extract salary/income amount
    income_match = re.search(r'\$(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)\s*(?:USD)?', text)
    if income_match:
        data['income_amount'] = income_match.group(1)
    
    # Extract employer
    employer_match = re.search(r'Employer[:\s]+(\w+(?:\s+\w+)*)', text, re.IGNORECASE)
    if employer_match:
        data['employer'] = employer_match.group(1)
    
    # Extract pay period
    period_match = re.search(r'(weekly|bi-weekly|monthly|annual)', text, re.IGNORECASE)
    if period_match:
        data['pay_period'] = period_match.group(1)
    
    return data

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    app.run(host='0.0.0.0', port=port)