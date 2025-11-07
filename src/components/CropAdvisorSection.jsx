import { useState } from 'react'

function CropAdvisorSection() {
  const [soilType, setSoilType] = useState('Loamy')
  const [temperature, setTemperature] = useState(25)
  const [humidity, setHumidity] = useState(65)

  // Crop recommendations based on conditions
  const getCropRecommendations = () => {
    const recommendations = []

    // Wheat - prefers loamy soil, moderate temp, moderate humidity
    if (soilType === 'Loamy' && temperature >= 15 && temperature <= 25 && humidity >= 50 && humidity <= 70) {
      recommendations.push({
        name: 'Wheat',
        icon: '🌾',
        suitability: 'Excellent',
        reason: 'Ideal conditions for wheat cultivation',
        yield: 'High',
      })
    }

    // Corn - prefers loamy/clay soil, warm temp, moderate humidity
    if ((soilType === 'Loamy' || soilType === 'Clay') && temperature >= 20 && temperature <= 30 && humidity >= 60 && humidity <= 80) {
      recommendations.push({
        name: 'Corn',
        icon: '🌽',
        suitability: 'Excellent',
        reason: 'Perfect for corn growth',
        yield: 'High',
      })
    }

    // Tomatoes - prefers loamy soil, warm temp, moderate humidity
    if (soilType === 'Loamy' && temperature >= 20 && temperature <= 28 && humidity >= 60 && humidity <= 75) {
      recommendations.push({
        name: 'Tomatoes',
        icon: '🍅',
        suitability: 'Excellent',
        reason: 'Optimal conditions for tomatoes',
        yield: 'High',
      })
    }

    // Potatoes - prefers sandy/loamy soil, cool to moderate temp
    if ((soilType === 'Sandy' || soilType === 'Loamy') && temperature >= 15 && temperature <= 22) {
      recommendations.push({
        name: 'Potatoes',
        icon: '🥔',
        suitability: 'Good',
        reason: 'Suitable conditions for potatoes',
        yield: 'Medium-High',
      })
    }

    // Rice - prefers clay soil, warm temp, high humidity
    if (soilType === 'Clay' && temperature >= 20 && temperature <= 35 && humidity >= 70) {
      recommendations.push({
        name: 'Rice',
        icon: '🌾',
        suitability: 'Excellent',
        reason: 'Ideal for rice cultivation',
        yield: 'High',
      })
    }

    // If no perfect matches, suggest based on individual conditions
    if (recommendations.length === 0) {
      if (temperature < 15) {
        recommendations.push({
          name: 'Lettuce',
          icon: '🥬',
          suitability: 'Good',
          reason: 'Cool weather crop suitable for current temperature',
          yield: 'Medium',
        })
      } else if (temperature > 30) {
        recommendations.push({
          name: 'Peppers',
          icon: '🌶️',
          suitability: 'Good',
          reason: 'Warm weather crop suitable for high temperature',
          yield: 'Medium-High',
        })
      } else {
        recommendations.push({
          name: 'Beans',
          icon: '🫘',
          suitability: 'Moderate',
          reason: 'Adaptable crop for current conditions',
          yield: 'Medium',
        })
      }
    }

    return recommendations
  }

  const recommendations = getCropRecommendations()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-desert-green-dark mb-2">Crop Advisor 🌱</h2>
        <p className="text-gray-600">Get personalized crop recommendations based on your field conditions</p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-desert-green-dark mb-4">Field Conditions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Soil Type
            </label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-green focus:border-transparent"
            >
              <option value="Loamy">Loamy</option>
              <option value="Clay">Clay</option>
              <option value="Sandy">Sandy</option>
              <option value="Silty">Silty</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Temperature: {temperature}°C
            </label>
            <input
              type="range"
              min="10"
              max="40"
              value={temperature}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Humidity: {humidity}%
            </label>
            <input
              type="range"
              min="30"
              max="90"
              value={humidity}
              onChange={(e) => setHumidity(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-xl font-semibold text-desert-green-dark mb-4">Recommended Crops</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((crop, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
              <div className="flex items-center mb-3">
                <span className="text-4xl mr-3">{crop.icon}</span>
                <div>
                  <h4 className="text-lg font-semibold text-desert-green-dark">{crop.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    crop.suitability === 'Excellent' 
                      ? 'bg-green-100 text-green-800' 
                      : crop.suitability === 'Good'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {crop.suitability}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{crop.reason}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500">Expected Yield:</span>
                <span className="font-semibold text-desert-gold">{crop.yield}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CropAdvisorSection

