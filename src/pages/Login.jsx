import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Farmer')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password, role)
      // Redirect based on role
      if (role === 'Farmer') {
        navigate('/farmer-dashboard')
      } else {
        navigate('/customer-dashboard')
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 relative overflow-hidden">
        {/* Background with field/market theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-desert-beige via-desert-sandy to-desert-tan opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23D4C4A8" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="max-w-md w-full mx-4 relative z-10">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-8 border border-desert-sandy">
            <h2 className="text-3xl font-bold text-center text-desert-green-dark mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Login to AgriNova360
            </p>

            {/* Role Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Login as
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-green focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-desert-green focus:ring-desert-green border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-desert-green hover:text-desert-green-dark">
                  Forgot password?
                </a>
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
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-desert-green hover:text-desert-green-dark font-medium">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Login
