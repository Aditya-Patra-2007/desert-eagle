from flask import Blueprint, request, jsonify
import openai  # Placeholder - can be replaced with custom logic

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/respond', methods=['POST'])
def respond():
    """
    Get AI chatbot response to user query
    
    Request Body:
    - message: str - User's message
    - conversationHistory: array - Previous messages (optional)
    - context: str - Additional context (optional)
    
    Returns:
    - JSON object with bot response and confidence score
    """
    try:
        data = request.get_json()
        message = data.get('message')
        conversation_history = data.get('conversationHistory', [])
        context = data.get('context', 'agriculture')
        
        if not message:
            return jsonify({'error': 'Message is required'}), 400
        
        # TODO: Integrate with OpenAI API or custom NLP model
        # For now, return a mock response
        response = generate_response(message, conversation_history, context)
        
        return jsonify({
            'response': response,
            'confidence': 0.85,
            'context': context
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def generate_response(message, history, context):
    """
    Generate chatbot response (placeholder - replace with actual AI model)
    """
    message_lower = message.lower()
    
    # Simple keyword-based responses
    if any(word in message_lower for word in ['wheat', 'grain']):
        return 'Based on your query, wheat grows well in arid regions with well-drained loamy soil. It requires moderate temperature (15-25°C) and moderate humidity (50-70%).'
    elif any(word in message_lower for word in ['tomato', 'tomatoes']):
        return 'Based on your query, tomatoes grow well in warm climates with loamy soil. They need temperatures between 20-28°C and moderate humidity around 60-75%.'
    elif any(word in message_lower for word in ['corn', 'maize']):
        return 'Based on your query, corn grows well in warm regions with loamy or clay soil. Optimal temperature is 20-30°C with high humidity (60-80%).'
    elif any(word in message_lower for word in ['arid', 'desert', 'dry']):
        return 'Based on your query, crops that grow well in arid regions include wheat, barley, millet, and certain varieties of corn. These crops are drought-resistant and can thrive with minimal water.'
    else:
        return 'Based on your query, this crop grows well in arid regions. For more specific information, please provide details about the crop type, soil conditions, or climate you\'re interested in.'

