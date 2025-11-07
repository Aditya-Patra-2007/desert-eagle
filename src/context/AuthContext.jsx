import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('agrinova_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Mock login function
  const login = async (email, password, role) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation - accept any email/password for demo
        if (email && password && role) {
          const userData = {
            email,
            role,
            name: email.split('@')[0], // Extract name from email
            id: Date.now().toString(),
          }
          setUser(userData)
          localStorage.setItem('agrinova_user', JSON.stringify(userData))
          resolve(userData)
        } else {
          reject(new Error('Please fill in all fields'))
        }
      }, 500) // Simulate network delay
    })
  }

  // Mock signup function
  const signup = async (name, email, password, role) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (name && email && password && role) {
          const userData = {
            email,
            role,
            name,
            id: Date.now().toString(),
          }
          setUser(userData)
          localStorage.setItem('agrinova_user', JSON.stringify(userData))
          resolve(userData)
        } else {
          reject(new Error('Please fill in all fields'))
        }
      }, 500) // Simulate network delay
    })
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem('agrinova_user')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

