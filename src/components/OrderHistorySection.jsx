function OrderHistorySection() {
  // Mock order history data
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 165,
      items: [
        { name: 'Organic Wheat', quantity: '50kg', price: 120 },
        { name: 'Fresh Tomatoes', quantity: '20kg', price: 45 },
      ],
    },
    {
      id: 'ORD-002',
      date: '2024-01-20',
      status: 'In Transit',
      total: 60,
      items: [
        { name: 'Sweet Corn', quantity: '30kg', price: 60 },
      ],
    },
    {
      id: 'ORD-003',
      date: '2024-01-25',
      status: 'Processing',
      total: 95,
      items: [
        { name: 'Organic Potatoes', quantity: '40kg', price: 35 },
        { name: 'Fresh Carrots', quantity: '30kg', price: 28 },
        { name: 'Onions', quantity: '20kg', price: 25 },
      ],
    },
    {
      id: 'ORD-004',
      date: '2024-01-10',
      status: 'Delivered',
      total: 140,
      items: [
        { name: 'Bell Peppers', quantity: '25kg', price: 40 },
        { name: 'Cucumbers', quantity: '30kg', price: 30 },
        { name: 'Organic Lettuce', quantity: '20kg', price: 22 },
        { name: 'Fresh Basil', quantity: '5kg', price: 18 },
      ],
    },
    {
      id: 'ORD-005',
      date: '2024-01-05',
      status: 'Delivered',
      total: 205,
      items: [
        { name: 'Fresh Strawberries', quantity: '20kg', price: 55 },
        { name: 'Organic Rice', quantity: '30kg', price: 85 },
        { name: 'Sweet Corn', quantity: '25kg', price: 60 },
      ],
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      case 'In Transit':
        return 'bg-yellow-100 text-yellow-800'
      case 'Processing':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)
  const totalOrders = orders.length
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-desert-green-dark mb-2">Order History 📦</h2>
        <p className="text-gray-600">View your past purchases and track current orders</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-desert-green-dark">{totalOrders}</p>
            </div>
            <div className="text-4xl">📦</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-desert-gold">${totalSpent}</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Delivered</p>
              <p className="text-3xl font-bold text-desert-green">{deliveredOrders}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-desert-green-dark mb-1">
                    Order {order.id}
                  </h3>
                  <p className="text-sm text-gray-600">Placed on {order.date}</p>
                </div>
                <div className="flex items-center space-x-4 mt-2 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className="text-xl font-bold text-desert-gold">${order.total}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Items:</h4>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-3">
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-800">{item.name}</span>
                        <span className="text-gray-500">({item.quantity})</span>
                      </div>
                      <span className="text-desert-gold font-semibold">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {order.status === 'Delivered' && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-sm text-desert-gold hover:text-desert-gold-dark font-medium">
                    Reorder Items →
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg">No orders yet.</p>
          <p className="text-gray-400 text-sm mt-2">Start shopping in the marketplace!</p>
        </div>
      )}
    </div>
  )
}

export default OrderHistorySection

