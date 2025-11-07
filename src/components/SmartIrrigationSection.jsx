import { useState, useEffect } from 'react'
import SensorCard from './SensorCard'

function SmartIrrigationSection() {
  const [sensors, setSensors] = useState([
    { 
      id: 1,
      name: 'Field Sensor 1 - North Field', 
      status: 'active', 
      temperature: 25, 
      humidity: 65, 
      soilMoisture: 72, 
      waterUsage: 120,
      lastUpdate: '2 min ago' 
    },
    { 
      id: 2,
      name: 'Field Sensor 2 - South Field', 
      status: 'active', 
      temperature: 23, 
      humidity: 70, 
      soilMoisture: 68, 
      waterUsage: 95,
      lastUpdate: '3 min ago' 
    },
    { 
      id: 3,
      name: 'Greenhouse Sensor', 
      status: 'active', 
      temperature: 28, 
      humidity: 75, 
      soilMoisture: 80, 
      waterUsage: 150,
      lastUpdate: '1 min ago' 
    },
    { 
      id: 4,
      name: 'Field Sensor 3 - East Field', 
      status: 'active', 
      temperature: 24, 
      humidity: 68, 
      soilMoisture: 65, 
      waterUsage: 110,
      lastUpdate: '4 min ago' 
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors((prevSensors) =>
        prevSensors.map((sensor) => ({
          ...sensor,
          temperature: sensor.temperature + (Math.random() * 2 - 1),
          humidity: Math.max(30, Math.min(90, sensor.humidity + (Math.random() * 4 - 2))),
          soilMoisture: Math.max(40, Math.min(90, sensor.soilMoisture + (Math.random() * 3 - 1.5))),
          waterUsage: sensor.waterUsage + (Math.random() * 10 - 5),
          lastUpdate: 'Just now',
        }))
      )
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const totalWaterUsage = sensors.reduce((sum, sensor) => sum + sensor.waterUsage, 0)
  const avgSoilMoisture = sensors.reduce((sum, sensor) => sum + sensor.soilMoisture, 0) / sensors.length
  const avgTemperature = sensors.reduce((sum, sensor) => sum + sensor.temperature, 0) / sensors.length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-desert-green-dark mb-2">Smart Irrigation 💧</h2>
        <p className="text-gray-600">Monitor real-time IoT sensor readings and water usage</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Water Usage</p>
              <p className="text-3xl font-bold text-desert-green">{totalWaterUsage.toFixed(0)} L</p>
              <p className="text-xs text-gray-500 mt-1">Today</p>
            </div>
            <div className="text-4xl">💧</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Soil Moisture</p>
              <p className="text-3xl font-bold text-desert-green">{avgSoilMoisture.toFixed(1)}%</p>
              <p className="text-xs text-gray-500 mt-1">Across all fields</p>
            </div>
            <div className="text-4xl">🌱</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Temperature</p>
              <p className="text-3xl font-bold text-desert-green">{avgTemperature.toFixed(1)}°C</p>
              <p className="text-xs text-gray-500 mt-1">Current average</p>
            </div>
            <div className="text-4xl">🌡️</div>
          </div>
        </div>
      </div>

      {/* Sensor Cards */}
      <div>
        <h3 className="text-xl font-semibold text-desert-green-dark mb-4">Sensor Readings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sensors.map((sensor) => (
            <div key={sensor.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-desert-green-dark">{sensor.name}</h4>
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
                    <span className="font-semibold">{sensor.temperature.toFixed(1)}°C</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-desert-gold h-2 rounded-full" 
                      style={{ width: `${(sensor.temperature / 40) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Humidity</span>
                    <span className="font-semibold">{sensor.humidity.toFixed(0)}%</span>
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
                    <span className="font-semibold">{sensor.soilMoisture.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-desert-tan h-2 rounded-full" 
                      style={{ width: `${sensor.soilMoisture}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Water Usage</span>
                    <span className="font-semibold">{sensor.waterUsage.toFixed(0)} L</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">Last updated: {sensor.lastUpdate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SmartIrrigationSection

