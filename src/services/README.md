# API Services

This directory contains API service functions for communicating with the backend.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update the base URL in `apiConfig.js` when your backend is ready:
```javascript
BASE_URL: 'http://your-backend-url.com/api'
```

## Usage

### Import the API functions:

```javascript
import {
  getCropRecommendations,
  getSensorReadings,
  getMarketplaceProducts,
  getYieldPrediction,
  getChatbotResponse,
} from '../services/api'
```

### Example: Crop Recommendations

```javascript
// In your component
import { getCropRecommendations } from '../services/api'

const fetchRecommendations = async () => {
  try {
    const response = await getCropRecommendations({
      soilType: 'Loamy',
      temperature: 25,
      humidity: 65,
    })
    console.log(response.data.recommendations)
  } catch (error) {
    console.error('Error fetching recommendations:', error)
  }
}
```

### Example: IoT Sensors

```javascript
import { getSensorReadings } from '../services/api'

// Get all sensors
const allSensors = await getSensorReadings()

// Get specific sensor
const sensor = await getSensorReadings('sensor-123')
```

### Example: Marketplace Products

```javascript
import { getMarketplaceProducts } from '../services/api'

const products = await getMarketplaceProducts({
  search: 'wheat',
  category: 'Grains',
  priceRange: '30-50',
  sortBy: 'price-low',
  page: 1,
  limit: 20,
})
```

### Example: Yield Prediction

```javascript
import { getYieldPrediction } from '../services/api'

const prediction = await getYieldPrediction({
  cropType: 'Wheat',
  fieldSize: 10,
  conditions: {
    temperature: 25,
    humidity: 65,
    soilMoisture: 72,
  },
  season: 'Winter',
})
```

### Example: Chatbot

```javascript
import { getChatbotResponse } from '../services/api'

const response = await getChatbotResponse({
  message: 'What crops grow well in arid regions?',
  conversationHistory: [],
  context: 'farming',
})
```

## Enabling Backend Integration

When your backend is ready:

1. Update `BASE_URL` in `apiConfig.js`
2. Uncomment the API calls in `api.js`
3. Remove or update the mock responses
4. Test each endpoint

## API Endpoints

- `GET /api/crops/recommend` - Get crop recommendations
- `GET /api/iot/sensors` - Get IoT sensor readings
- `GET /api/marketplace/products` - Get marketplace products
- `POST /api/predict/yield` - Get yield predictions
- `POST /api/chatbot/respond` - Get chatbot responses

