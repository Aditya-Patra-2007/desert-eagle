import axios from 'axios'

// Base API URL - Update this when backend is ready
const BASE_URL = 'http://localhost:3000/api' // Placeholder URL

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor (for adding auth tokens, etc.)
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor (for handling errors globally)
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API Service Functions

/**
 * Crop Recommendation API
 * Get crop recommendations based on soil type, temperature, and humidity
 * 
 * @param {Object} params - Query parameters
 * @param {string} params.soilType - Type of soil (Loamy, Clay, Sandy, Silty)
 * @param {number} params.temperature - Temperature in Celsius
 * @param {number} params.humidity - Humidity percentage
 * @returns {Promise} Crop recommendations
 */
export const getCropRecommendations = async (params) => {
  // TODO: Uncomment when backend is ready
  // return api.get('/crops/recommend', { params })
  
  // Mock response for now
  return Promise.resolve({
    data: {
      recommendations: [
        {
          crop: 'Wheat',
          suitability: 'Excellent',
          reason: 'Ideal conditions for wheat cultivation',
          yield: 'High',
        },
      ],
    },
  })
}

/**
 * IoT Sensors API
 * Get real-time sensor readings from IoT devices
 * 
 * @param {string} sensorId - Optional sensor ID to get specific sensor data
 * @returns {Promise} Sensor readings
 */
export const getSensorReadings = async (sensorId = null) => {
  // TODO: Uncomment when backend is ready
  // const url = sensorId ? `/iot/sensors/${sensorId}` : '/iot/sensors'
  // return api.get(url)
  
  // Mock response for now
  return Promise.resolve({
    data: {
      sensors: [
        {
          id: 1,
          name: 'Field Sensor 1',
          temperature: 25,
          humidity: 65,
          soilMoisture: 72,
          waterUsage: 120,
          status: 'active',
          lastUpdate: new Date().toISOString(),
        },
      ],
    },
  })
}

/**
 * Marketplace Products API
 * Get all products from the marketplace
 * 
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {string} params.category - Product category filter
 * @param {string} params.priceRange - Price range filter
 * @param {string} params.sortBy - Sort option
 * @param {number} params.page - Page number for pagination
 * @param {number} params.limit - Items per page
 * @returns {Promise} Products list
 */
export const getMarketplaceProducts = async (params = {}) => {
  // TODO: Uncomment when backend is ready
  // return api.get('/marketplace/products', { params })
  
  // Mock response for now
  return Promise.resolve({
    data: {
      products: [],
      total: 0,
      page: 1,
      limit: 20,
    },
  })
}

/**
 * Get single product by ID
 * 
 * @param {string|number} productId - Product ID
 * @returns {Promise} Product details
 */
export const getProductById = async (productId) => {
  // TODO: Uncomment when backend is ready
  // return api.get(`/marketplace/products/${productId}`)
  
  // Mock response for now
  return Promise.resolve({
    data: {
      id: productId,
      name: 'Sample Product',
      price: 0,
    },
  })
}

/**
 * Yield Prediction API
 * Get yield predictions based on historical data and current conditions
 * 
 * @param {Object} data - Prediction parameters
 * @param {string} data.cropType - Type of crop
 * @param {number} data.fieldSize - Field size in hectares
 * @param {Object} data.conditions - Current field conditions
 * @param {string} data.season - Growing season
 * @returns {Promise} Yield prediction data
 */
export const getYieldPrediction = async (data) => {
  // TODO: Uncomment when backend is ready
  // return api.post('/predict/yield', data)
  
  // Mock response for now
  return Promise.resolve({
    data: {
      predictedYield: 0,
      confidence: 0,
      factors: [],
      recommendations: [],
    },
  })
}

/**
 * Chatbot Response API
 * Get AI-generated response to user query
 * 
 * @param {Object} data - Chat data
 * @param {string} data.message - User's message
 * @param {Array} data.conversationHistory - Previous messages in conversation
 * @param {string} data.context - Additional context (optional)
 * @returns {Promise} Bot response
 */
export const getChatbotResponse = async (data) => {
  // TODO: Uncomment when backend is ready
  // return api.post('/chatbot/respond', data)
  
  // Mock response for now
  return Promise.resolve({
    data: {
      response: 'Based on your query, this crop grows well in arid regions.',
      confidence: 0.85,
    },
  })
}

// Export the axios instance for custom requests
export default api

