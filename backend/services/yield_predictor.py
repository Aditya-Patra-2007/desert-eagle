import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List

class YieldPredictor:
    """Service for predicting crop yields based on conditions"""
    
    def __init__(self):
        # Base yield per hectare (kg) for different crops
        self.base_yields = {
            'Wheat': 3000,
            'Corn': 8000,
            'Tomatoes': 50000,
            'Potatoes': 25000,
            'Rice': 4000,
            'Barley': 2500
        }
    
    def predict(self, crop_type, field_size, conditions, season):
        """
        Predict crop yield
        
        Args:
            crop_type: str - Type of crop
            field_size: float - Field size in hectares
            conditions: dict - Field conditions (temperature, humidity, soilMoisture, soilType)
            season: str - Growing season
        
        Returns:
            dict: Prediction results with yield, confidence, factors, and recommendations
        """
        base_yield = self.base_yields.get(crop_type, 2000)
        
        # Calculate yield multiplier based on conditions
        multiplier = self._calculate_multiplier(conditions)
        
        # Predict yield
        predicted_yield = base_yield * field_size * multiplier
        
        # Calculate confidence based on how optimal conditions are
        confidence = self._calculate_confidence(conditions)
        
        # Identify factors affecting yield
        factors = self._identify_factors(conditions)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(conditions, factors)
        
        return {
            'predictedYield': round(predicted_yield, 2),
            'confidence': round(confidence, 2),
            'factors': factors,
            'recommendations': recommendations,
            'cropType': crop_type,
            'fieldSize': field_size,
            'season': season,
            'baseYieldPerHectare': base_yield
        }
    
    def _calculate_multiplier(self, conditions):
        """Calculate yield multiplier based on conditions (0.5 to 1.5)"""
        multiplier = 1.0
        
        # Temperature factor
        temp = conditions.get('temperature', 25)
        if 20 <= temp <= 28:
            multiplier *= 1.2
        elif 15 <= temp < 20 or 28 < temp <= 32:
            multiplier *= 1.0
        else:
            multiplier *= 0.7
        
        # Humidity factor
        humidity = conditions.get('humidity', 65)
        if 60 <= humidity <= 75:
            multiplier *= 1.1
        elif 50 <= humidity < 60 or 75 < humidity <= 80:
            multiplier *= 1.0
        else:
            multiplier *= 0.8
        
        # Soil moisture factor
        soil_moisture = conditions.get('soilMoisture', 70)
        if 65 <= soil_moisture <= 80:
            multiplier *= 1.15
        elif 55 <= soil_moisture < 65 or 80 < soil_moisture <= 85:
            multiplier *= 1.0
        else:
            multiplier *= 0.75
        
        return min(max(multiplier, 0.5), 1.5)  # Clamp between 0.5 and 1.5
    
    def _calculate_confidence(self, conditions):
        """Calculate confidence score (0-1)"""
        confidence = 0.5  # Base confidence
        
        # Check if conditions are in optimal ranges
        temp = conditions.get('temperature', 25)
        humidity = conditions.get('humidity', 65)
        soil_moisture = conditions.get('soilMoisture', 70)
        
        if 20 <= temp <= 28:
            confidence += 0.15
        if 60 <= humidity <= 75:
            confidence += 0.15
        if 65 <= soil_moisture <= 80:
            confidence += 0.2
        
        return min(confidence, 1.0)
    
    def _identify_factors(self, conditions):
        """Identify factors affecting yield"""
        factors = []
        
        temp = conditions.get('temperature', 25)
        if temp < 15 or temp > 35:
            factors.append('Extreme temperature conditions')
        elif 20 <= temp <= 28:
            factors.append('Optimal temperature range')
        
        humidity = conditions.get('humidity', 65)
        if humidity < 40 or humidity > 85:
            factors.append('Suboptimal humidity levels')
        elif 60 <= humidity <= 75:
            factors.append('Ideal humidity for crop growth')
        
        soil_moisture = conditions.get('soilMoisture', 70)
        if soil_moisture < 50:
            factors.append('Low soil moisture - irrigation needed')
        elif 65 <= soil_moisture <= 80:
            factors.append('Optimal soil moisture')
        elif soil_moisture > 85:
            factors.append('Excessive soil moisture - drainage needed')
        
        return factors
    
    def _generate_recommendations(self, conditions, factors):
        """Generate recommendations based on conditions and factors"""
        recommendations = []
        
        temp = conditions.get('temperature', 25)
        if temp < 15:
            recommendations.append('Consider using greenhouse or cold frames to maintain temperature')
        elif temp > 35:
            recommendations.append('Implement shade structures and increase irrigation frequency')
        
        soil_moisture = conditions.get('soilMoisture', 70)
        if soil_moisture < 50:
            recommendations.append('Increase irrigation to maintain soil moisture between 65-80%')
        elif soil_moisture > 85:
            recommendations.append('Improve drainage to prevent waterlogging')
        
        humidity = conditions.get('humidity', 65)
        if humidity < 40:
            recommendations.append('Consider misting systems to increase humidity')
        elif humidity > 85:
            recommendations.append('Ensure proper ventilation to reduce humidity')
        
        if not recommendations:
            recommendations.append('Current conditions are optimal - maintain current practices')
        
        return recommendations
    
    def get_history(self, crop_type=None, months=6):
        """Get historical yield predictions (mock data)"""
        history = []
        base_date = datetime.now()
        
        for i in range(months):
            date = base_date - timedelta(days=30 * i)
            yield_value = self.base_yields.get(crop_type, 2000) * (0.9 + np.random.random() * 0.2)
            
            history.append({
                'month': date.strftime('%Y-%m'),
                'yield': round(yield_value, 2),
                'cropType': crop_type or 'Mixed'
            })
        
        return history

