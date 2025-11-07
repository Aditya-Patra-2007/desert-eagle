function SensorCard({ sensor }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-desert-green-dark">
          {sensor.name}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          sensor.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          {sensor.status}
        </span>
      </div>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Temperature</span>
            <span className="font-semibold">{sensor.temperature}°C</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-desert-gold h-2 rounded-full" 
              style={{ width: `${(sensor.temperature / 50) * 100}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Humidity</span>
            <span className="font-semibold">{sensor.humidity}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-desert-green h-2 rounded-full" 
              style={{ width: `${sensor.humidity}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Soil Moisture</span>
            <span className="font-semibold">{sensor.soilMoisture}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-desert-tan h-2 rounded-full" 
              style={{ width: `${sensor.soilMoisture}%` }}
            ></div>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4">Last updated: {sensor.lastUpdate}</p>
    </div>
  )
}

export default SensorCard

