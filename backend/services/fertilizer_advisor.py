class FertilizerAdvisor:
    """Service for fertilizer recommendations based on crop and soil conditions"""
    
    def __init__(self):
        self.fertilizer_requirements = {
            'Wheat': {
                'nitrogen': 'high',
                'phosphorus': 'medium',
                'potassium': 'medium',
                'recommended': ['Urea', 'DAP', 'Potash']
            },
            'Corn': {
                'nitrogen': 'very high',
                'phosphorus': 'high',
                'potassium': 'medium',
                'recommended': ['Urea', 'Superphosphate', 'Potash']
            },
            'Tomatoes': {
                'nitrogen': 'medium',
                'phosphorus': 'high',
                'potassium': 'very high',
                'recommended': ['NPK 10-20-20', 'Potash', 'Compost']
            },
            'Potatoes': {
                'nitrogen': 'medium',
                'phosphorus': 'high',
                'potassium': 'high',
                'recommended': ['NPK 15-15-15', 'Potash', 'Organic Manure']
            }
        }
    
    def get_recommendations(self, crop_type, soil_type, soil_ph=None):
        """
        Get fertilizer recommendations for a crop
        
        Args:
            crop_type: str - Type of crop
            soil_type: str - Type of soil
            soil_ph: float - Soil pH (optional)
        
        Returns:
            dict: Fertilizer recommendations
        """
        crop_data = self.fertilizer_requirements.get(crop_type, {})
        
        if not crop_data:
            return {
                'error': f'No fertilizer data available for {crop_type}'
            }
        
        recommendations = {
            'crop': crop_type,
            'soilType': soil_type,
            'requirements': {
                'nitrogen': crop_data.get('nitrogen'),
                'phosphorus': crop_data.get('phosphorus'),
                'potassium': crop_data.get('potassium')
            },
            'recommendedFertilizers': crop_data.get('recommended', []),
            'applicationSchedule': self._get_application_schedule(crop_type),
            'notes': self._get_notes(crop_type, soil_type, soil_ph)
        }
        
        return recommendations
    
    def _get_application_schedule(self, crop_type):
        """Get fertilizer application schedule"""
        schedules = {
            'Wheat': [
                {'stage': 'Pre-planting', 'fertilizer': 'DAP', 'amount': '100-120 kg/ha'},
                {'stage': 'Tillering', 'fertilizer': 'Urea', 'amount': '50-60 kg/ha'},
                {'stage': 'Flowering', 'fertilizer': 'Urea', 'amount': '30-40 kg/ha'}
            ],
            'Corn': [
                {'stage': 'Pre-planting', 'fertilizer': 'DAP', 'amount': '150-180 kg/ha'},
                {'stage': 'V6 stage', 'fertilizer': 'Urea', 'amount': '100-120 kg/ha'},
                {'stage': 'Tasseling', 'fertilizer': 'Urea', 'amount': '50-60 kg/ha'}
            ],
            'Tomatoes': [
                {'stage': 'Transplanting', 'fertilizer': 'NPK 10-20-20', 'amount': '200-250 kg/ha'},
                {'stage': 'Flowering', 'fertilizer': 'Potash', 'amount': '100-150 kg/ha'},
                {'stage': 'Fruiting', 'fertilizer': 'Potash', 'amount': '50-75 kg/ha'}
            ]
        }
        
        return schedules.get(crop_type, [
            {'stage': 'General', 'fertilizer': 'Balanced NPK', 'amount': 'As per soil test'}
        ])
    
    def _get_notes(self, crop_type, soil_type, soil_ph):
        """Get additional notes based on soil conditions"""
        notes = []
        
        if soil_type == 'Clay':
            notes.append('Clay soil retains nutrients well - reduce application rates by 10-15%')
        elif soil_type == 'Sandy':
            notes.append('Sandy soil requires more frequent applications due to low retention')
        
        if soil_ph:
            if soil_ph < 6.0:
                notes.append('Acidic soil detected - consider lime application')
            elif soil_ph > 7.5:
                notes.append('Alkaline soil - use acid-forming fertilizers')
        
        return notes

