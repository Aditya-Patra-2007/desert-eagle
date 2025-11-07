from flask import Flask
from flask_cors import CORS
from config import Config
from models.database import db
from routes.crops import crops_bp
from routes.iot import iot_bp
from routes.marketplace import marketplace_bp
from routes.predictions import predictions_bp
from routes.chatbot import chatbot_bp

def create_app():
    """Create and configure Flask application"""
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize database
    db.init_app(app)
    
    # Enable CORS
    CORS(app, origins=app.config['CORS_ORIGINS'])
    
    # Register blueprints
    app.register_blueprint(crops_bp, url_prefix=f'/api/{app.config["API_VERSION"]}/crops')
    app.register_blueprint(iot_bp, url_prefix=f'/api/{app.config["API_VERSION"]}/iot')
    app.register_blueprint(marketplace_bp, url_prefix=f'/api/{app.config["API_VERSION"]}/marketplace')
    app.register_blueprint(predictions_bp, url_prefix=f'/api/{app.config["API_VERSION"]}/predict')
    app.register_blueprint(chatbot_bp, url_prefix=f'/api/{app.config["API_VERSION"]}/chatbot')
    
    @app.route('/')
    def health_check():
        return {'status': 'ok', 'message': 'AgriNova360 API is running'}
    
    @app.route('/api/health')
    def health():
        return {'status': 'healthy', 'version': app.config['API_VERSION']}
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=app.config['DEBUG'], host='0.0.0.0', port=3000)

