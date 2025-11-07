import { useState } from 'react'

function CustomerChatbotSection() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I\'m your AI agriculture assistant. How can I help you today?',
      sender: 'bot',
    },
  ])
  const [input, setInput] = useState('')

  // Simple response logic for agriculture queries
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes('wheat') || lowerMessage.includes('grain')) {
      return 'Wheat is a staple crop that requires well-drained loamy soil, moderate temperature (15-25°C), and moderate humidity (50-70%). It\'s best planted in fall for winter wheat or early spring for spring wheat. Regular watering and proper fertilization are essential for good yields.'
    }
    if (lowerMessage.includes('tomato') || lowerMessage.includes('tomatoes')) {
      return 'Tomatoes thrive in warm weather (20-28°C) with loamy soil and moderate humidity (60-75%). They need plenty of sunlight (6-8 hours daily) and consistent watering. Support with stakes or cages, and watch for common pests like aphids and whiteflies.'
    }
    if (lowerMessage.includes('corn') || lowerMessage.includes('maize')) {
      return 'Corn grows best in warm temperatures (20-30°C) with loamy or clay soil. It needs high humidity (60-80%) and plenty of water, especially during tasseling. Plant in rows for better pollination and ensure adequate spacing (30-40cm between plants).'
    }
    if (lowerMessage.includes('organic') || lowerMessage.includes('pesticide')) {
      return 'Organic farming avoids synthetic pesticides and fertilizers. Use natural alternatives like neem oil for pests, compost for nutrients, and crop rotation to maintain soil health. Organic certification requires following strict guidelines and regular inspections.'
    }
    if (lowerMessage.includes('soil') || lowerMessage.includes('fertilizer')) {
      return 'Good soil health is crucial for farming. Test your soil pH regularly (most crops prefer 6.0-7.0). Use organic compost, manure, or balanced fertilizers. Crop rotation helps maintain nutrients. Loamy soil (mix of sand, silt, clay) is ideal for most crops.'
    }
    if (lowerMessage.includes('water') || lowerMessage.includes('irrigation')) {
      return 'Proper irrigation is essential. Most crops need 1-2 inches of water per week. Use drip irrigation for efficiency, water early morning to reduce evaporation, and avoid overwatering which can cause root rot. Monitor soil moisture regularly.'
    }
    if (lowerMessage.includes('harvest') || lowerMessage.includes('harvesting')) {
      return 'Harvest timing varies by crop. Generally, harvest when crops reach maturity - check for color changes, firmness, and size. Harvest in the morning when temperatures are cooler. Handle produce gently to avoid bruising and store properly to maintain freshness.'
    }
    if (lowerMessage.includes('pest') || lowerMessage.includes('disease')) {
      return 'Common pests include aphids, whiteflies, and caterpillars. Use integrated pest management: introduce beneficial insects, use organic sprays like neem oil, practice crop rotation, and remove affected plants. Monitor regularly and act early to prevent spread.'
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('buy')) {
      return 'You can browse our marketplace to see current prices for various agricultural products. Prices vary based on crop type, quality, and season. Check the marketplace section for detailed pricing and availability from different farmers.'
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! I\'m here to help with any agriculture-related questions. You can ask me about crops, farming techniques, soil management, irrigation, pests, harvesting, or anything else related to agriculture!'
    }

    return 'Thank you for your question! I can help you with information about crops, farming techniques, soil management, irrigation, pest control, harvesting, and more. Could you please provide more specific details about what you\'d like to know?'
  }

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    // Simulate bot thinking
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: 'bot',
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const quickQuestions = [
    'How to grow tomatoes?',
    'What is organic farming?',
    'How to manage soil health?',
    'Best irrigation practices?',
    'How to control pests?',
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-desert-green-dark mb-2">AI Chatbot 🤖</h2>
        <p className="text-gray-600">Get instant answers to your agriculture questions</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg flex flex-col" style={{ height: '600px' }}>
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-desert-gold text-white'
                    : 'bg-desert-beige text-gray-800'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about agriculture..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-gold focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-desert-gold text-white px-6 py-2 rounded-md font-semibold hover:bg-desert-gold-dark transition"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Quick Questions */}
      <div>
        <h3 className="text-lg font-semibold text-desert-green-dark mb-4">Quick Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickQuestions.map((question, index) => (
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
  )
}

export default CustomerChatbotSection

