/**
 * API Configuration
 * 
 * This file contains configuration for API endpoints.
 * Update these values when your backend is ready.
 */

export const API_CONFIG = {
  // Base URL for all API requests
  BASE_URL: 'http://localhost:3000/api', // TODO: Update with your backend URL
  
  // API Endpoints
  ENDPOINTS: {
    // Crop Recommendation
    CROP_RECOMMEND: '/crops/recommend',
    
    // IoT Sensors
    IOT_SENSORS: '/iot/sensors',
    IOT_SENSOR_BY_ID: (id) => `/iot/sensors/${id}`,
    
    // Marketplace
    MARKETPLACE_PRODUCTS: '/marketplace/products',
    MARKETPLACE_PRODUCT_BY_ID: (id) => `/marketplace/products/${id}`,
    
    // Yield Prediction
    YIELD_PREDICTION: '/predict/yield',
    
    // Chatbot
    CHATBOT_RESPOND: '/chatbot/respond',
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Retry configuration
  RETRY: {
    retries: 3,
    retryDelay: 1000,
  },
}

/**
 * Example usage:
 * 
 * import { API_CONFIG } from './apiConfig'
 * 
 * const url = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.CROP_RECOMMEND
 * // Result: 'http://localhost:3000/api/crops/recommend'
 */

