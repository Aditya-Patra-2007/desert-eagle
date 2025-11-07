from flask import Blueprint, request, jsonify
from services.yield_predictor import YieldPredictor

predictions_bp = Blueprint('predictions', __name__)
predictor = YieldPredictor()

@predictions_bp.route('/yield', methods=['POST'])
def predict_yield():
    """
    Predict crop yield based on conditions
    
    Request Body:
    - cropType: str - Type of crop
    - fieldSize: float - Field size in hectares
    - conditions: dict - Field conditions
        - temperature: float
        - humidity: float
        - soilMoisture: float
        - soilType: str
    - season: str - Growing season
    
    Returns:
    - JSON object with yield prediction and recommendations
    """
    try:
        data = request.get_json()
        
        crop_type = data.get('cropType')
        field_size = data.get('fieldSize')
        conditions = data.get('conditions', {})
        season = data.get('season', 'Unknown')
        
        if not all([crop_type, field_size, conditions]):
            return jsonify({
                'error': 'Missing required fields: cropType, fieldSize, conditions'
            }), 400
        
        prediction = predictor.predict(
            crop_type=crop_type,
            field_size=field_size,
            conditions=conditions,
            season=season
        )
        
        return jsonify(prediction), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@predictions_bp.route('/yield/history', methods=['GET'])
def get_yield_history():
    """
    Get historical yield predictions
    
    Query Parameters:
    - cropType: str - Filter by crop type
    - months: int - Number of months of history (default: 6)
    
    Returns:
    - JSON array of historical predictions
    """
    try:
        crop_type = request.args.get('cropType', type=str)
        months = request.args.get('months', default=6, type=int)
        
        history = predictor.get_history(crop_type, months)
        return jsonify({'history': history}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

