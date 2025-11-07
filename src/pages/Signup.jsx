import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Farmer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signup(name, email, password, role)
      // Redirect based on role
      if (role === 'Farmer') {
        navigate('/farmer-dashboard')
      } else {
        navigate('/customer-dashboard')
      }
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 relative overflow-hidden">
        {/* Background with field/market theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-desert-tan via-desert-sandy to-desert-beige opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23D4C4A8" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="max-w-md w-full mx-4 relative z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-8 border border-desert-sandy">
            <h2 className="text-3xl font-bold text-center text-desert-green-dark mb-2">
              Join AgriNova360
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Create your account and start your journey
            </p>

            {/* Role Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I want to join as
              </label>
              <div className="flex gap-2 bg-desert-beige p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setRole('Farmer')}
                  className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
                    role === 'Farmer'
                      ? 'bg-desert-green text-white shadow-md'
                      : 'text-desert-green-dark hover:bg-desert-sandy'
                  }`}
                >
                  🌾 Farmer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('Customer')}
                  className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
                    role === 'Customer'
                      ? 'bg-desert-gold text-white shadow-md'
                      : 'text-desert-gold-dark hover:bg-desert-sandy'
                  }`}
                >
                  🛒 Customer
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-green focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-green focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-green focus:border-transparent"
                  placeholder="••••••••"
                />
                <p className="mt-1 text-xs text-gray-500">Minimum 6 characters</p>
              </div>
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-desert-green focus:ring-desert-green border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="text-desert-green hover:text-desert-green-dark">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  role === 'Farmer' 
                    ? 'bg-desert-green hover:bg-desert-green-dark' 
                    : 'bg-desert-gold hover:bg-desert-gold-dark'
                } text-white py-3 rounded-md font-semibold transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-desert-green hover:text-desert-green-dark font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Signup
