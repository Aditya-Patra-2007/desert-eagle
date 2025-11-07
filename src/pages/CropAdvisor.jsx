import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function CropAdvisor() {
  const recommendations = [
    {
      crop: 'Wheat',
      issue: 'Low soil moisture detected',
      recommendation: 'Increase irrigation frequency. Current moisture is at 45%, optimal range is 60-70%.',
      priority: 'High',
    },
    {
      crop: 'Tomatoes',
      issue: 'Pest activity detected',
      recommendation: 'Apply organic neem oil spray. Monitor for aphids and whiteflies.',
      priority: 'Medium',
    },
    {
      crop: 'Corn',
      issue: 'Optimal harvest window approaching',
      recommendation: 'Harvest within next 7-10 days for maximum yield. Weather conditions are favorable.',
      priority: 'High',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-desert-beige py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-desert-green-dark mb-8">
            AI Crop Advisor
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recommendations */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-desert-green-dark mb-4">
                Recommendations
              </h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-desert-green-dark">
                          {rec.crop}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{rec.issue}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        rec.priority === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {rec.priority}
                      </span>
                    </div>
                    <p className="text-gray-700">{rec.recommendation}</p>
                    <button className="mt-4 text-desert-green hover:text-desert-green-dark text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-semibold text-desert-green-dark mb-4">
                Quick Actions
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <button className="w-full bg-desert-green text-white py-3 rounded-md font-semibold hover:bg-desert-green-dark transition">
                  Ask AI Advisor
                </button>
                <button className="w-full bg-desert-gold text-white py-3 rounded-md font-semibold hover:bg-desert-gold-dark transition">
                  Schedule Irrigation
                </button>
                <button className="w-full bg-desert-tan text-desert-green-dark py-3 rounded-md font-semibold hover:bg-desert-sandy transition">
                  View Crop Calendar
                </button>
                <button className="w-full bg-desert-tan text-desert-green-dark py-3 rounded-md font-semibold hover:bg-desert-sandy transition">
                  Pest Management
                </button>
              </div>

              {/* Weather Widget */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="text-lg font-semibold text-desert-green-dark mb-4">
                  Weather Forecast
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Today</span>
                    <span className="font-semibold">25°C / Sunny</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tomorrow</span>
                    <span className="font-semibold">23°C / Partly Cloudy</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Day 3</span>
                    <span className="font-semibold">27°C / Sunny</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CropAdvisor

