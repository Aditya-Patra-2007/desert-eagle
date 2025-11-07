class CropRecommender:
    """Service for crop recommendations based on environmental conditions"""
    
    def __init__(self):
        self.crop_database = {
            'Wheat': {
                'soilTypes': ['Loamy'],
                'tempRange': (15, 25),
                'humidityRange': (50, 70),
                'suitability': 'Excellent',
                'yield': 'High'
            },
            'Corn': {
                'soilTypes': ['Loamy', 'Clay'],
                'tempRange': (20, 30),
                'humidityRange': (60, 80),
                'suitability': 'Excellent',
                'yield': 'High'
            },
            'Tomatoes': {
                'soilTypes': ['Loamy'],
                'tempRange': (20, 28),
                'humidityRange': (60, 75),
                'suitability': 'Excellent',
                'yield': 'High'
            },
            'Potatoes': {
                'soilTypes': ['Sandy', 'Loamy'],
                'tempRange': (15, 22),
                'humidityRange': (50, 70),
                'suitability': 'Good',
                'yield': 'Medium-High'
            },
            'Rice': {
                'soilTypes': ['Clay'],
                'tempRange': (20, 35),
                'humidityRange': (70, 90),
                'suitability': 'Excellent',
                'yield': 'High'
            },
            'Barley': {
                'soilTypes': ['Loamy', 'Sandy'],
                'tempRange': (10, 20),
                'humidityRange': (40, 60),
                'suitability': 'Good',
                'yield': 'Medium'
            }
        }
    
    def get_recommendations(self, soil_type, temperature, humidity):
        """
        Get crop recommendations based on conditions
        
        Args:
            soil_type: str - Type of soil
            temperature: float - Temperature in Celsius
            humidity: float - Humidity percentage
        
        Returns:
            list: Array of recommended crops with suitability scores
        """
        recommendations = []
        
        for crop_name, crop_data in self.crop_database.items():
            score = self._calculate_suitability_score(
                crop_data, soil_type, temperature, humidity
            )
            
            if score > 0.5:  # Only recommend if suitability > 50%
                recommendations.append({
                    'crop': crop_name,
                    'suitability': crop_data['suitability'],
                    'reason': self._generate_reason(crop_name, crop_data, soil_type, temperature, humidity),
                    'yield': crop_data['yield'],
                    'score': round(score, 2)
                })
        
        # Sort by score (highest first)
        recommendations.sort(key=lambda x: x['score'], reverse=True)
        
        return recommendations
    
    def _calculate_suitability_score(self, crop_data, soil_type, temperature, humidity):
        """Calculate suitability score (0-1) for a crop"""
        score = 0.0
        
        # Soil type match (40% weight)
        if soil_type in crop_data['soilTypes']:
            score += 0.4
        
        # Temperature match (30% weight)
        temp_min, temp_max = crop_data['tempRange']
        if temp_min <= temperature <= temp_max:
            score += 0.3
        elif abs(temperature - (temp_min + temp_max) / 2) <= 5:
            score += 0.15  # Partial match
        
        # Humidity match (30% weight)
        hum_min, hum_max = crop_data['humidityRange']
        if hum_min <= humidity <= hum_max:
            score += 0.3
        elif abs(humidity - (hum_min + hum_max) / 2) <= 10:
            score += 0.15  # Partial match
        
        return score
    
    def _generate_reason(self, crop_name, crop_data, soil_type, temperature, humidity):
        """Generate human-readable reason for recommendation"""
        reasons = []
        
        if soil_type in crop_data['soilTypes']:
            reasons.append(f"optimal {soil_type} soil")
        
        temp_min, temp_max = crop_data['tempRange']
        if temp_min <= temperature <= temp_max:
            reasons.append(f"ideal temperature range ({temp_min}-{temp_max}°C)")
        
        hum_min, hum_max = crop_data['humidityRange']
        if hum_min <= humidity <= hum_max:
            reasons.append(f"suitable humidity ({hum_min}-{hum_max}%)")
        
        if reasons:
            return f"{crop_name} is recommended because of {', '.join(reasons)}."
        else:
            return f"{crop_name} may grow in these conditions with proper care."
    
    def get_all_crops(self):
        """Get list of all available crops"""
        return list(self.crop_database.keys())

