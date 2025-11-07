import random
import time
from datetime import datetime, timedelta
from typing import List, Dict

class SensorSimulator:
    """Simulate IoT sensor readings for smart irrigation"""
    
    def __init__(self):
        self.sensors = [
            {
                'id': 'sensor-001',
                'name': 'Field Sensor 1 - North Field',
                'location': 'North Field',
                'baseTemp': 25,
                'baseHumidity': 65,
                'baseSoilMoisture': 72,
                'baseWaterUsage': 120
            },
            {
                'id': 'sensor-002',
                'name': 'Field Sensor 2 - South Field',
                'location': 'South Field',
                'baseTemp': 23,
                'baseHumidity': 70,
                'baseSoilMoisture': 68,
                'baseWaterUsage': 95
            },
            {
                'id': 'sensor-003',
                'name': 'Greenhouse Sensor',
                'location': 'Greenhouse',
                'baseTemp': 28,
                'baseHumidity': 75,
                'baseSoilMoisture': 80,
                'baseWaterUsage': 150
            },
            {
                'id': 'sensor-004',
                'name': 'Field Sensor 3 - East Field',
                'location': 'East Field',
                'baseTemp': 24,
                'baseHumidity': 68,
                'baseSoilMoisture': 65,
                'baseWaterUsage': 110
            }
        ]
    
    def get_all_sensors(self) -> List[Dict]:
        """Get current readings from all sensors"""
        readings = []
        
        for sensor in self.sensors:
            reading = self._generate_reading(sensor)
            readings.append(reading)
        
        return readings
    
    def get_sensor(self, sensor_id: str) -> Dict:
        """Get reading from specific sensor"""
        sensor = next((s for s in self.sensors if s['id'] == sensor_id), None)
        
        if not sensor:
            return None
        
        return self._generate_reading(sensor)
    
    def get_history(self, sensor_id: str, hours: int = 24) -> List[Dict]:
        """Get historical readings for a sensor"""
        sensor = next((s for s in self.sensors if s['id'] == sensor_id), None)
        
        if not sensor:
            return []
        
        history = []
        now = datetime.now()
        
        for i in range(hours):
            timestamp = now - timedelta(hours=i)
            reading = self._generate_reading(sensor, timestamp=timestamp)
            history.append(reading)
        
        return history
    
    def _generate_reading(self, sensor: Dict, timestamp: datetime = None) -> Dict:
        """Generate a sensor reading with realistic variations"""
        if timestamp is None:
            timestamp = datetime.now()
        
        # Add realistic variations (±10% for temp, ±5% for others)
        temp_variation = random.uniform(-2.5, 2.5)
        humidity_variation = random.uniform(-5, 5)
        soil_moisture_variation = random.uniform(-3, 3)
        water_usage_variation = random.uniform(-10, 10)
        
        temperature = sensor['baseTemp'] + temp_variation
        humidity = max(30, min(90, sensor['baseHumidity'] + humidity_variation))
        soil_moisture = max(40, min(90, sensor['baseSoilMoisture'] + soil_moisture_variation))
        water_usage = max(0, sensor['baseWaterUsage'] + water_usage_variation)
        
        # Determine status based on readings
        if 20 <= temperature <= 30 and 60 <= humidity <= 80 and 65 <= soil_moisture <= 85:
            status = 'active'
        elif soil_moisture < 50 or temperature > 35:
            status = 'warning'
        else:
            status = 'active'
        
        return {
            'id': sensor['id'],
            'name': sensor['name'],
            'location': sensor['location'],
            'temperature': round(temperature, 1),
            'humidity': round(humidity, 1),
            'soilMoisture': round(soil_moisture, 1),
            'waterUsage': round(water_usage, 1),
            'status': status,
            'lastUpdate': timestamp.isoformat() if timestamp else datetime.now().isoformat()
        }
    
    def update_sensor(self, sensor_id: str, new_values: Dict):
        """Update sensor base values (for testing)"""
        sensor = next((s for s in self.sensors if s['id'] == sensor_id), None)
        
        if sensor:
            sensor.update(new_values)
            return True
        return False

