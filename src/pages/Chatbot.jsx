import { useState, useRef, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your AI agriculture assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Generate mock bot response
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Simple keyword-based responses
    if (lowerMessage.includes('wheat') || lowerMessage.includes('grain')) {
      return 'Based on your query, wheat grows well in arid regions with well-drained loamy soil. It requires moderate temperature (15-25°C) and moderate humidity (50-70%).'
    }
    if (lowerMessage.includes('tomato') || lowerMessage.includes('tomatoes')) {
      return 'Based on your query, tomatoes grow well in warm climates with loamy soil. They need temperatures between 20-28°C and moderate humidity around 60-75%.'
    }
    if (lowerMessage.includes('corn') || lowerMessage.includes('maize')) {
      return 'Based on your query, corn grows well in warm regions with loamy or clay soil. Optimal temperature is 20-30°C with high humidity (60-80%).'
    }
    if (lowerMessage.includes('rice')) {
      return 'Based on your query, rice grows well in tropical and subtropical regions with clay soil. It requires warm temperatures (20-35°C) and high humidity (70%+).'
    }
    if (lowerMessage.includes('potato') || lowerMessage.includes('potatoes')) {
      return 'Based on your query, potatoes grow well in cool to moderate climates with sandy or loamy soil. They prefer temperatures between 15-22°C.'
    }
    if (lowerMessage.includes('soil') || lowerMessage.includes('fertilizer')) {
      return 'Based on your query, soil health is crucial for crop growth. Loamy soil (mix of sand, silt, and clay) is ideal for most crops. Regular testing and organic fertilizers help maintain soil quality.'
    }
    if (lowerMessage.includes('water') || lowerMessage.includes('irrigation')) {
      return 'Based on your query, proper irrigation is essential. Most crops need 1-2 inches of water per week. Drip irrigation systems work well in arid regions to conserve water.'
    }
    if (lowerMessage.includes('pest') || lowerMessage.includes('disease')) {
      return 'Based on your query, pest management is important for healthy crops. Integrated pest management using organic methods works well in arid regions. Regular monitoring helps prevent outbreaks.'
    }
    if (lowerMessage.includes('harvest') || lowerMessage.includes('harvesting')) {
      return 'Based on your query, harvest timing varies by crop. Generally, crops should be harvested when they reach maturity. In arid regions, early morning harvesting helps preserve crop quality.'
    }
    if (lowerMessage.includes('arid') || lowerMessage.includes('desert') || lowerMessage.includes('dry')) {
      return 'Based on your query, crops that grow well in arid regions include wheat, barley, millet, and certain varieties of corn. These crops are drought-resistant and can thrive with minimal water.'
    }
    
    // Default response
    return 'Based on your query, this crop grows well in arid regions. For more specific information, please provide details about the crop type, soil conditions, or climate you\'re interested in.'
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate bot thinking delay
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-desert-beige py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-desert-green-dark mb-2">
              AI Chatbot Assistant
            </h1>
            <p className="text-gray-600">
              Ask me anything about agriculture, crops, farming techniques, and more
            </p>
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-lg shadow-lg flex flex-col" style={{ height: '600px' }}>
            {/* Chat History - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-desert-gold text-white rounded-br-none'
                        : 'bg-desert-beige text-gray-800 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-desert-beige text-gray-800 rounded-lg rounded-bl-none px-4 py-3 max-w-xs lg:max-w-md">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question here..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-gold focus:border-transparent"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  className="bg-desert-gold text-white px-6 py-2 rounded-md font-semibold hover:bg-desert-gold-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-desert-green-dark mb-4">
              Quick Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'What crops grow well in arid regions?',
                'How to grow tomatoes?',
                'Best irrigation practices?',
                'What is organic farming?',
                'How to manage soil health?',
                'Pest control methods?',
              ].map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="bg-white rounded-lg shadow-md p-4 text-left hover:shadow-lg transition text-desert-green-dark border border-gray-200 hover:border-desert-gold"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Chatbot
