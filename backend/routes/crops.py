from flask import Blueprint, request, jsonify
from services.crop_recommender import CropRecommender

crops_bp = Blueprint('crops', __name__)
recommender = CropRecommender()

@crops_bp.route('/recommend', methods=['GET'])
def recommend_crops():
    """
    Get crop recommendations based on soil type, temperature, and humidity
    
    Query Parameters:
    - soilType: str (Loamy, Clay, Sandy, Silty)
    - temperature: float (in Celsius)
    - humidity: float (percentage)
    
    Returns:
    - JSON array of recommended crops with suitability scores
    """
    try:
        soil_type = request.args.get('soilType', type=str)
        temperature = request.args.get('temperature', type=float)
        humidity = request.args.get('humidity', type=float)
        
        if not all([soil_type, temperature is not None, humidity is not None]):
            return jsonify({
                'error': 'Missing required parameters: soilType, temperature, humidity'
            }), 400
        
        recommendations = recommender.get_recommendations(
            soil_type=soil_type,
            temperature=temperature,
            humidity=humidity
        )
        
        return jsonify({
            'recommendations': recommendations,
            'query': {
                'soilType': soil_type,
                'temperature': temperature,
                'humidity': humidity
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@crops_bp.route('/list', methods=['GET'])
def list_crops():
    """Get list of all available crops"""
    try:
        crops = recommender.get_all_crops()
        return jsonify({'crops': crops}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

