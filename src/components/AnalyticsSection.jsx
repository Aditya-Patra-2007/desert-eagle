import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

function AnalyticsSection() {
  // Dummy data for yield prediction
  const yieldData = [
    { month: 'Jan', predicted: 1200, actual: 1150, target: 1300 },
    { month: 'Feb', predicted: 1350, actual: 1280, target: 1400 },
    { month: 'Mar', predicted: 1500, actual: 1450, target: 1550 },
    { month: 'Apr', predicted: 1650, actual: 1620, target: 1700 },
    { month: 'May', predicted: 1800, actual: 1750, target: 1850 },
    { month: 'Jun', predicted: 1950, actual: 1900, target: 2000 },
  ]

  const revenueData = [
    { month: 'Jan', revenue: 45000, expenses: 28000 },
    { month: 'Feb', revenue: 52000, expenses: 30000 },
    { month: 'Mar', revenue: 58000, expenses: 32000 },
    { month: 'Apr', revenue: 62000, expenses: 35000 },
    { month: 'May', revenue: 68000, expenses: 38000 },
    { month: 'Jun', revenue: 75000, expenses: 40000 },
  ]

  const cropPerformance = [
    { crop: 'Wheat', yield: 1200, revenue: 45000, growth: '+15%' },
    { crop: 'Corn', yield: 950, revenue: 38000, growth: '+12%' },
    { crop: 'Tomatoes', yield: 800, revenue: 35000, growth: '+8%' },
    { crop: 'Potatoes', yield: 1100, revenue: 42000, growth: '+20%' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-desert-green-dark mb-2">Analytics 📊</h2>
        <p className="text-gray-600">Track yield predictions, revenue, and crop performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Total Yield (kg)</p>
          <p className="text-3xl font-bold text-desert-green-dark">12,450</p>
          <p className="text-sm text-green-600 mt-1">↑ 15% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-desert-gold">$45,230</p>
          <p className="text-sm text-green-600 mt-1">↑ 8% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Avg Yield per Crop</p>
          <p className="text-3xl font-bold text-desert-green">1,012 kg</p>
          <p className="text-sm text-green-600 mt-1">↑ 5% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Profit Margin</p>
          <p className="text-3xl font-bold text-desert-green-dark">42%</p>
          <p className="text-sm text-green-600 mt-1">↑ 3% from last month</p>
        </div>
      </div>

      {/* Yield Prediction Chart */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-desert-green-dark mb-4">Yield Prediction (kg)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={yieldData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="predicted" stroke="#8B9A5B" strokeWidth={2} name="Predicted" />
            <Line type="monotone" dataKey="actual" stroke="#D4AF37" strokeWidth={2} name="Actual" />
            <Line type="monotone" dataKey="target" stroke="#6B7A4A" strokeWidth={2} strokeDasharray="5 5" name="Target" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue vs Expenses */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-desert-green-dark mb-4">Revenue vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#D4AF37" name="Revenue" />
            <Bar dataKey="expenses" fill="#E8D5B7" name="Expenses" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Crop Performance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-desert-green-dark mb-4">Crop Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cropPerformance.map((crop, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-desert-green-dark mb-2">{crop.crop}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Yield:</span>
                  <span className="font-semibold">{crop.yield} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-semibold text-desert-gold">${crop.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth:</span>
                  <span className="font-semibold text-green-600">{crop.growth}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-desert-green-dark mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="revenue" stackId="1" stroke="#D4AF37" fill="#D4AF37" fillOpacity={0.6} name="Revenue" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AnalyticsSection

