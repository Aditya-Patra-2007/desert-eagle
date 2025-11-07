from flask import Blueprint, request, jsonify
from simulate_sensors import SensorSimulator

iot_bp = Blueprint('iot', __name__)
sensor_simulator = SensorSimulator()

@iot_bp.route('/sensors', methods=['GET'])
def get_sensors():
    """
    Get all IoT sensor readings
    
    Returns:
    - JSON array of sensor data
    """
    try:
        sensors = sensor_simulator.get_all_sensors()
        return jsonify({'sensors': sensors}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@iot_bp.route('/sensors/<sensor_id>', methods=['GET'])
def get_sensor_by_id(sensor_id):
    """
    Get specific sensor reading by ID
    
    Parameters:
    - sensor_id: str - Sensor identifier
    
    Returns:
    - JSON object with sensor data
    """
    try:
        sensor = sensor_simulator.get_sensor(sensor_id)
        if sensor:
            return jsonify(sensor), 200
        else:
            return jsonify({'error': 'Sensor not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@iot_bp.route('/sensors/<sensor_id>/history', methods=['GET'])
def get_sensor_history(sensor_id):
    """
    Get historical data for a sensor
    
    Query Parameters:
    - hours: int (default: 24) - Number of hours of history
    
    Returns:
    - JSON array of historical sensor readings
    """
    try:
        hours = request.args.get('hours', default=24, type=int)
        history = sensor_simulator.get_history(sensor_id, hours)
        return jsonify({'history': history}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

