import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Analytics() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-desert-beige py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-desert-green-dark mb-8">
            Analytics Dashboard
          </h1>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-sm text-gray-600 mb-2">Total Yield</div>
              <div className="text-3xl font-bold text-desert-green-dark">12,450 kg</div>
              <div className="text-sm text-green-600 mt-2">↑ 15% from last month</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-sm text-gray-600 mb-2">Revenue</div>
              <div className="text-3xl font-bold text-desert-gold">$45,230</div>
              <div className="text-sm text-green-600 mt-2">↑ 8% from last month</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-sm text-gray-600 mb-2">Water Usage</div>
              <div className="text-3xl font-bold text-desert-green">8,200 L</div>
              <div className="text-sm text-red-600 mt-2">↓ 12% from last month</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-sm text-gray-600 mb-2">Crop Health</div>
              <div className="text-3xl font-bold text-desert-green-dark">92%</div>
              <div className="text-sm text-green-600 mt-2">↑ 5% from last month</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-desert-green-dark mb-4">
                Yield Over Time
              </h2>
              <div className="h-64 bg-desert-beige rounded flex items-center justify-center">
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-desert-green-dark mb-4">
                Revenue Breakdown
              </h2>
              <div className="h-64 bg-desert-beige rounded flex items-center justify-center">
                <p className="text-gray-500">Chart visualization would go here</p>
              </div>
            </div>
          </div>

          {/* Detailed Reports */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-desert-green-dark mb-4">
              Recent Reports
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-desert-beige rounded">
                <div>
                  <h3 className="font-semibold text-desert-green-dark">Monthly Yield Report - January 2024</h3>
                  <p className="text-sm text-gray-600">Generated on Jan 31, 2024</p>
                </div>
                <button className="bg-desert-green text-white px-4 py-2 rounded-md hover:bg-desert-green-dark transition">
                  Download
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-desert-beige rounded">
                <div>
                  <h3 className="font-semibold text-desert-green-dark">Water Usage Analysis - Q4 2023</h3>
                  <p className="text-sm text-gray-600">Generated on Dec 31, 2023</p>
                </div>
                <button className="bg-desert-green text-white px-4 py-2 rounded-md hover:bg-desert-green-dark transition">
                  Download
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-desert-beige rounded">
                <div>
                  <h3 className="font-semibold text-desert-green-dark">Crop Health Assessment - December 2023</h3>
                  <p className="text-sm text-gray-600">Generated on Dec 15, 2023</p>
                </div>
                <button className="bg-desert-green text-white px-4 py-2 rounded-md hover:bg-desert-green-dark transition">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Analytics

