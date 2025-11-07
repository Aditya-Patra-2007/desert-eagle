import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CartSidebar from '../components/CartSidebar'
import { useCart } from '../context/CartContext'
import productsData from '../data/products.json'

function Marketplace() {
  const [products, setProducts] = useState(productsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const { addToCart, setIsCartOpen } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    let filtered = [...productsData]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((product) => product.category === categoryFilter)
    }

    // Price filter
    if (priceFilter !== 'all') {
      switch (priceFilter) {
        case 'under-30':
          filtered = filtered.filter((product) => product.price < 30)
          break
        case '30-50':
          filtered = filtered.filter((product) => product.price >= 30 && product.price <= 50)
          break
        case '50-100':
          filtered = filtered.filter((product) => product.price > 50 && product.price <= 100)
          break
        case 'over-100':
          filtered = filtered.filter((product) => product.price > 100)
          break
        default:
          break
      }
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

    setProducts(filtered)
  }, [searchTerm, priceFilter, categoryFilter, sortBy])

  const categories = ['all', ...new Set(productsData.map((p) => p.category))]

  const handleAddToCart = (product) => {
    addToCart(product, 1)
    // Optional: Show a brief notification
  }

  const handleBuyNow = (product) => {
    addToCart(product, 1)
    setIsCartOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartSidebar />
      <main className="flex-grow bg-desert-beige py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-desert-green-dark mb-4">
              Marketplace
            </h1>
            <p className="text-lg text-gray-700">
              Browse and purchase fresh agricultural products directly from farmers
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search by Crop Name
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-gold focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-gold focus:border-transparent"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-gold focus:border-transparent"
                >
                  <option value="all">All Prices</option>
                  <option value="under-30">Under $30</option>
                  <option value="30-50">$30 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="over-100">Over $100</option>
                </select>
              </div>
            </div>

            {/* Sort */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-gold focus:border-transparent"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-desert-green-dark">{products.length}</span> products
            </p>
            {(searchTerm || priceFilter !== 'all' || categoryFilter !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setPriceFilter('all')
                  setCategoryFilter('all')
                }}
                className="text-desert-gold hover:text-desert-gold-dark text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image */}
                  <div className="h-48 bg-desert-beige flex items-center justify-center">
                    <span className="text-6xl">{product.image}</span>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Crop Name */}
                    <h3 className="text-lg font-semibold text-desert-green-dark mb-2">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Seller Name */}
                    <p className="text-xs text-gray-500 mb-3">
                      <span className="font-medium">Seller:</span> {product.farmer}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      <span className="text-yellow-500 text-sm">⭐</span>
                      <span className="text-sm text-gray-700 ml-1">{product.rating}</span>
                      <span className="text-xs text-gray-500 ml-2">({product.reviews} reviews)</span>
                    </div>

                    {/* Price per kg */}
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-desert-gold">${product.price}</span>
                      <span className="text-sm text-gray-500 ml-1">per kg</span>
                    </div>

                    {/* Stock Status */}
                    <div className="mb-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          product.stock > 100
                            ? 'bg-green-100 text-green-800'
                            : product.stock > 50
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.stock} kg in stock
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-desert-gold text-white py-2 rounded-md font-semibold hover:bg-desert-gold-dark transition text-sm"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="flex-1 bg-desert-green text-white py-2 rounded-md font-semibold hover:bg-desert-green-dark transition text-sm"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setPriceFilter('all')
                  setCategoryFilter('all')
                }}
                className="mt-4 text-desert-gold hover:text-desert-gold-dark font-medium"
              >
                Clear filters to see all products
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Marketplace
