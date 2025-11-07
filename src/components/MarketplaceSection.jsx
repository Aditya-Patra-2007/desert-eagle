import { useState, useEffect } from 'react'
import productsData from '../data/products.json'

function MarketplaceSection() {
  const [products, setProducts] = useState(productsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')

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
    // This would typically add to cart context/state
    alert(`${product.name} added to cart!`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-desert-green-dark mb-2">Marketplace 🛒</h2>
        <p className="text-gray-600">Browse and purchase fresh products directly from farmers</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
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
      <div className="flex items-center justify-between">
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
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-desert-beige flex items-center justify-center">
                <span className="text-6xl">{product.image}</span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-desert-green-dark">
                    {product.name}
                  </h3>
                  <div className="flex items-center text-yellow-500 text-sm">
                    <span>⭐</span>
                    <span className="ml-1 text-gray-700">{product.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <p className="text-xs text-gray-500 mb-3">
                  by {product.farmer} • {product.reviews} reviews
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-xl font-bold text-desert-gold">${product.price}</span>
                    <span className="text-xs text-gray-500 ml-1">/kg</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.stock > 100 
                      ? 'bg-green-100 text-green-800' 
                      : product.stock > 50
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock} kg in stock
                  </span>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-desert-gold text-white py-2 rounded-md font-semibold hover:bg-desert-gold-dark transition"
                >
                  Add to Cart
                </button>
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
  )
}

export default MarketplaceSection

