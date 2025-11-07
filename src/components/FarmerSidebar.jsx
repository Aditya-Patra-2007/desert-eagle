function FarmerSidebar({ activeSection, setActiveSection }) {
  const menuItems = [
    { id: 'crop-advisor', label: 'Crop Advisor', icon: '🌱' },
    { id: 'smart-irrigation', label: 'Smart Irrigation', icon: '💧' },
    { id: 'add-products', label: 'Add Products', icon: '🛍️' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
  ]

  return (
    <aside className="w-64 bg-desert-sandy min-h-[calc(100vh-4rem)] p-4 overflow-y-auto">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeSection === item.id
                ? 'bg-desert-green text-white shadow-md'
                : 'bg-white text-desert-green-dark hover:bg-desert-beige'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default FarmerSidebar

