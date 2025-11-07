import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FarmerSidebar from '../components/FarmerSidebar'
import CropAdvisorSection from '../components/CropAdvisorSection'
import SmartIrrigationSection from '../components/SmartIrrigationSection'
import AddProductsSection from '../components/AddProductsSection'
import AnalyticsSection from '../components/AnalyticsSection'

function FarmerDashboard() {
  const [activeSection, setActiveSection] = useState('crop-advisor')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderSection = () => {
    switch (activeSection) {
      case 'crop-advisor':
        return <CropAdvisorSection />
      case 'smart-irrigation':
        return <SmartIrrigationSection />
      case 'add-products':
        return <AddProductsSection />
      case 'analytics':
        return <AnalyticsSection />
      default:
        return <CropAdvisorSection />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-20 left-4 z-50 bg-desert-green text-white p-2 rounded-md shadow-lg"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static top-16 left-0 bottom-0 z-40 transition-transform duration-300 ease-in-out`}
        >
          <FarmerSidebar 
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

export default FarmerDashboard
