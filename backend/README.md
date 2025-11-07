# AgriNova360 Backend API

Flask-based REST API for AgriNova360 agricultural management platform.

## Features

- 🌾 Crop recommendation system
- 💧 IoT sensor data simulation
- 🛒 Marketplace product management
- 📊 Yield prediction
- 🤖 AI chatbot integration

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

### 3. Initialize Database

```bash
python -c "from app import create_app; from models.database import db; app = create_app(); app.app_context().push(); db.create_all()"
```

### 4. Run the Server

```bash
python app.py
```

The API will be available at `http://localhost:3000`

## API Endpoints

### Crop Recommendations
- `GET /api/v1/crops/recommend?soilType=Loamy&temperature=25&humidity=65`
- `GET /api/v1/crops/list`

### IoT Sensors
- `GET /api/v1/iot/sensors`
- `GET /api/v1/iot/sensors/<sensor_id>`
- `GET /api/v1/iot/sensors/<sensor_id>/history?hours=24`

### Marketplace
- `GET /api/v1/marketplace/products?search=wheat&category=Grains&page=1&limit=20`
- `GET /api/v1/marketplace/products/<product_id>`
- `POST /api/v1/marketplace/products`

### Yield Prediction
- `POST /api/v1/predict/yield`
- `GET /api/v1/predict/yield/history?cropType=Wheat&months=6`

### Chatbot
- `POST /api/v1/chatbot/respond`

## Project Structure

```
backend/
├── app.py                 # Main Flask application
├── config.py              # Configuration settings
├── requirements.txt       # Python dependencies
├── routes/                # API route handlers
│   ├── crops.py
│   ├── iot.py
│   ├── marketplace.py
│   ├── predictions.py
│   └── chatbot.py
├── models/                # Database models
│   ├── schemas.py        # Pydantic schemas
│   └── database.py       # SQLAlchemy models
├── services/              # Business logic
│   ├── crop_recommender.py
│   ├── yield_predictor.py
│   └── fertilizer_advisor.py
└── simulate_sensors.py   # IoT sensor simulation
```

## Development

### Running in Development Mode

```bash
export FLASK_ENV=development
python app.py
```

### Running with Auto-reload

```bash
flask run --reload
```

## Testing

Test endpoints using curl or Postman:

```bash
# Health check
curl http://localhost:3000/api/health

# Get crop recommendations
curl "http://localhost:3000/api/v1/crops/recommend?soilType=Loamy&temperature=25&humidity=65"

# Get sensor readings
curl http://localhost:3000/api/v1/iot/sensors
```

## Production Deployment

1. Set `FLASK_ENV=production` in `.env`
2. Use a production WSGI server (e.g., Gunicorn)
3. Configure proper database (PostgreSQL recommended)
4. Set up proper CORS origins
5. Use environment variables for sensitive data

