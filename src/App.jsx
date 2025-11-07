import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import FarmerDashboard from './pages/FarmerDashboard'
import CustomerDashboard from './pages/CustomerDashboard'
import Marketplace from './pages/Marketplace'
import CropAdvisor from './pages/CropAdvisor'
import Analytics from './pages/Analytics'
import Chatbot from './pages/Chatbot'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/crop-advisor" element={<CropAdvisor />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
