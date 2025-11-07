import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CustomerSidebar from '../components/CustomerSidebar'
import MarketplaceSection from '../components/MarketplaceSection'
import CustomerChatbotSection from '../components/CustomerChatbotSection'
import OrderHistorySection from '../components/OrderHistorySection'

function CustomerDashboard() {
  const [activeSection, setActiveSection] = useState('marketplace')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderSection = () => {
    switch (activeSection) {
      case 'marketplace':
        return <MarketplaceSection />
      case 'chatbot':
        return <CustomerChatbotSection />
      case 'order-history':
        return <OrderHistorySection />
      default:
        return <MarketplaceSection />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-20 left-4 z-50 bg-desert-gold text-white p-2 rounded-md shadow-lg"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static top-16 left-0 bottom-0 z-40 transition-transform duration-300 ease-in-out`}
        >
          <CustomerSidebar
            activeSection={activeSection}
            setActiveSection={(section) => {
              setActiveSection(section)
              setSidebarOpen(false) // Close sidebar on mobile when section is selected
            }}
          />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-grow bg-desert-beige p-4 lg:p-8 lg:ml-64 min-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default CustomerDashboard
