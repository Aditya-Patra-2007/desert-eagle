import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const { getCartItemCount, setIsCartOpen } = useCart()
  const navigate = useNavigate()
  const cartItemCount = getCartItemCount()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/marketplace', label: 'Marketplace' },
  ]

  return (
    <nav className="bg-desert-sandy shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl">🌾</span>
              <span className="text-2xl font-bold text-desert-green-dark">
                AgriNova360
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={link.to}
                  className="text-desert-green-dark hover:text-desert-gold px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Cart Button */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => setIsCartOpen(true)}
              className="relative text-desert-green-dark hover:text-desert-gold px-3 py-2 rounded-md text-sm font-medium transition"
            >
              🛒 Cart
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-desert-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </motion.span>
              )}
            </motion.button>

            {isAuthenticated ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link
                    to={user?.role === 'Farmer' ? '/farmer-dashboard' : '/customer-dashboard'}
                    className="text-desert-green-dark hover:text-desert-gold px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    Dashboard
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center space-x-3"
                >
                  <span className="text-sm text-desert-green-dark hidden lg:block">
                    {user?.name} ({user?.role})
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-desert-green text-white hover:bg-desert-green-dark px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    Logout
                  </button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Link
                    to="/login"
                    className="text-desert-green-dark hover:text-desert-gold px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    Login
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link
                    to="/signup"
                    className="bg-desert-green text-white hover:bg-desert-green-dark px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-desert-green-dark hover:text-desert-gold p-2"
          >
            {mobileMenuOpen ? (
              <motion.svg
                initial={{ rotate: 0 }}
                animate={{ rotate: 180 }}
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                initial={{ rotate: 0 }}
                animate={{ rotate: 0 }}
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </motion.svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-desert-tan"
            >
              <div className="px-2 pt-2 pb-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-desert-green-dark hover:text-desert-gold hover:bg-desert-beige px-3 py-2 rounded-md text-base font-medium transition"
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsCartOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="relative w-full text-left text-desert-green-dark hover:text-desert-gold hover:bg-desert-beige px-3 py-2 rounded-md text-base font-medium transition"
                >
                  🛒 Cart
                  {cartItemCount > 0 && (
                    <span className="ml-2 bg-desert-gold text-white text-xs font-bold rounded-full px-2 py-0.5">
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </span>
                  )}
                </button>
                {isAuthenticated ? (
                  <>
                    <Link
                      to={user?.role === 'Farmer' ? '/farmer-dashboard' : '/customer-dashboard'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-desert-green-dark hover:text-desert-gold hover:bg-desert-beige px-3 py-2 rounded-md text-base font-medium transition"
                    >
                      Dashboard
                    </Link>
                    <div className="px-3 py-2 text-sm text-desert-green-dark">
                      {user?.name} ({user?.role})
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left bg-desert-green text-white hover:bg-desert-green-dark px-3 py-2 rounded-md text-base font-medium transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-desert-green-dark hover:text-desert-gold hover:bg-desert-beige px-3 py-2 rounded-md text-base font-medium transition"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block bg-desert-green text-white hover:bg-desert-green-dark px-3 py-2 rounded-md text-base font-medium transition text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar
