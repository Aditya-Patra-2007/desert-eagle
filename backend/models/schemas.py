from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime

# Crop Recommendation Schemas
class CropRecommendationRequest(BaseModel):
    soilType: str = Field(..., description="Type of soil (Loamy, Clay, Sandy, Silty)")
    temperature: float = Field(..., description="Temperature in Celsius")
    humidity: float = Field(..., description="Humidity percentage")

class CropRecommendation(BaseModel):
    crop: str
    suitability: str
    reason: str
    yield: str
    score: float

# IoT Sensor Schemas
class SensorReading(BaseModel):
    id: str
    name: str
    temperature: float
    humidity: float
    soilMoisture: float
    waterUsage: float
    status: str
    lastUpdate: datetime

# Marketplace Schemas
class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    stock: int
    category: str
    image: Optional[str] = "🌾"
    farmer: Optional[str] = "Unknown"

class ProductResponse(BaseModel):
    id: int
    name: str
    description: str
    price: float
    stock: int
    category: str
    image: str
    farmer: str
    rating: float
    reviews: int

# Yield Prediction Schemas
class YieldPredictionRequest(BaseModel):
    cropType: str
    fieldSize: float
    conditions: dict
    season: str

class YieldPrediction(BaseModel):
    predictedYield: float
    confidence: float
    factors: List[str]
    recommendations: List[str]

# Chatbot Schemas
class ChatbotRequest(BaseModel):
    message: str
    conversationHistory: Optional[List[dict]] = []
    context: Optional[str] = "agriculture"

class ChatbotResponse(BaseModel):
    response: str
    confidence: float
    context: str

