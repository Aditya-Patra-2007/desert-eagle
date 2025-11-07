import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-desert-beige to-desert-sandy py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-desert-green-dark mb-6">
                Welcome to AgriNova360
              </h1>
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Revolutionizing agriculture with smart technology, sustainable practices, and innovative solutions for modern farming.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="bg-desert-green text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-desert-green-dark transition shadow-lg"
                >
                  Join as Farmer
                </Link>
                <Link
                  to="/marketplace"
                  className="bg-desert-gold text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-desert-gold-dark transition shadow-lg"
                >
                  Shop as Customer
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-desert-green-dark mb-12">
              Our Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-lg bg-desert-beige">
                <div className="text-5xl mb-4">🌾</div>
                <h3 className="text-xl font-semibold text-desert-green-dark mb-3">
                  Smart Farming
                </h3>
                <p className="text-gray-700">
                  Monitor your crops with IoT sensors and get real-time insights into your farm's health.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-desert-beige">
                <div className="text-5xl mb-4">🛒</div>
                <h3 className="text-xl font-semibold text-desert-green-dark mb-3">
                  Marketplace
                </h3>
                <p className="text-gray-700">
                  Buy and sell agricultural products directly from farmers in our trusted marketplace.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-desert-beige">
                <div className="text-5xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-desert-green-dark mb-3">
                  AI Crop Advisor
                </h3>
                <p className="text-gray-700">
                  Get personalized recommendations for crop management, pest control, and optimal harvest times.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-desert-beige">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-desert-green-dark mb-3">
                  Analytics Dashboard
                </h3>
                <p className="text-gray-700">
                  Track your farm's performance with comprehensive analytics and detailed reports.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-desert-beige">
                <div className="text-5xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-desert-green-dark mb-3">
                  AI Chatbot
                </h3>
                <p className="text-gray-700">
                  Get instant answers to your farming questions with our 24/7 AI-powered assistant.
                </p>
              </div>
              <div className="text-center p-6 rounded-lg bg-desert-beige">
                <div className="text-5xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-desert-green-dark mb-3">
                  Sustainable Practices
                </h3>
                <p className="text-gray-700">
                  Learn and implement eco-friendly farming techniques for a better tomorrow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-desert-tan">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-desert-green-dark mb-6">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Join thousands of farmers who are already using AgriNova360 to improve their yields and grow their business.
            </p>
            <Link
              to="/signup"
              className="inline-block bg-desert-green text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-desert-green-dark transition shadow-lg"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage

