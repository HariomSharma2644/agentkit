from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import logging

# Import services
from services.recipe_recommender import RecipeRecommender
from services.health_analyzer import HealthAnalyzer
from services.consumption_predictor import ConsumptionPredictor
from services.personalization_engine import PersonalizationEngine

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize AI services
recipe_recommender = RecipeRecommender()
health_analyzer = HealthAnalyzer()
consumption_predictor = ConsumptionPredictor()
personalization_engine = PersonalizationEngine()

# Health check
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK', 'service': 'OilWise AI Engine'}), 200

# Recipe Recommendation Endpoint
@app.route('/api/recipes/recommend', methods=['POST'])
def recommend_recipes():
    try:
        data = request.json
        user_id = data.get('user_id')
        preferences = data.get('preferences', {})
        
        recommendations = recipe_recommender.get_recommendations(user_id, preferences)
        
        return jsonify({
            'success': True,
            'data': recommendations
        }), 200
    except Exception as e:
        logger.error(f"Error in recipe recommendation: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

# Health Risk Assessment Endpoint
@app.route('/api/health/assess-risk', methods=['POST'])
def assess_health_risk():
    try:
        data = request.json
        health_metrics = data.get('metrics', {})
        
        risk_assessment = health_analyzer.assess_risk(health_metrics)
        
        return jsonify({
            'success': True,
            'data': risk_assessment
        }), 200
    except Exception as e:
        logger.error(f"Error in health risk assessment: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

# Consumption Prediction Endpoint
@app.route('/api/consumption/predict', methods=['POST'])
def predict_consumption():
    try:
        data = request.json
        user_id = data.get('user_id')
        historical_data = data.get('historical_data', [])
        
        prediction = consumption_predictor.predict(user_id, historical_data)
        
        return jsonify({
            'success': True,
            'data': prediction
        }), 200
    except Exception as e:
        logger.error(f"Error in consumption prediction: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

# Personalization Endpoint
@app.route('/api/personalization/profile', methods=['POST'])
def create_personalization_profile():
    try:
        data = request.json
        user_id = data.get('user_id')
        user_data = data.get('user_data', {})
        
        profile = personalization_engine.create_profile(user_id, user_data)
        
        return jsonify({
            'success': True,
            'data': profile
        }), 200
    except Exception as e:
        logger.error(f"Error in personalization: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

# Batch Processing Endpoint
@app.route('/api/batch/process', methods=['POST'])
def process_batch():
    try:
        data = request.json
        batch_type = data.get('type')
        batch_data = data.get('data', [])
        
        if batch_type == 'health_metrics':
            results = [health_analyzer.assess_risk(item) for item in batch_data]
        elif batch_type == 'consumption':
            results = [consumption_predictor.predict(item['user_id'], item.get('data', [])) for item in batch_data]
        else:
            return jsonify({'success': False, 'error': 'Unknown batch type'}), 400
        
        return jsonify({
            'success': True,
            'data': results
        }), 200
    except Exception as e:
        logger.error(f"Error in batch processing: {str(e)}")
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=os.getenv('DEBUG', False), port=port, host='0.0.0.0')

