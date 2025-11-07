import { useState } from 'react'

function AddProductsSection() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Vegetables',
    image: '',
  })
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Organic Wheat',
      description: 'Premium quality organic wheat',
      price: 120,
      stock: 500,
      category: 'Grains',
      image: '🌾',
    },
    {
      id: 2,
      name: 'Fresh Tomatoes',
      description: 'Farm-fresh tomatoes',
      price: 45,
      stock: 200,
      category: 'Vegetables',
      image: '🍅',
    },
  ])
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newProduct = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      image: formData.image || '🌾',
    }
    setProducts([...products, newProduct])
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: 'Vegetables',
      image: '',
    })
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-desert-green-dark mb-2">Add Products 🛍️</h2>
        <p className="text-gray-600">List your crops and produce for sale in the marketplace</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-desert-green-dark mb-4">Add New Product</h3>
          {showSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
              Product added successfully!
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-green focus:border-transparent"
                placeholder="e.g., Organic Wheat"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-green focus:border-transparent"
                placeholder="Describe your product..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-green focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock (kg) *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-green focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-green focus:border-transparent"
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Grains">Grains</option>
                <option value="Fruits">Fruits</option>
                <option value="Herbs">Herbs</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image Emoji (optional)
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                maxLength="2"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-desert-green focus:border-transparent text-2xl text-center"
                placeholder="🌾"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-desert-green text-white py-3 rounded-md font-semibold hover:bg-desert-green-dark transition"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-desert-green-dark mb-4">Your Products ({products.length})</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {products.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{product.image}</span>
                    <div>
                      <h4 className="font-semibold text-desert-green-dark">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className="text-desert-gold font-semibold">${product.price}</span>
                        <span className="text-gray-500">Stock: {product.stock} kg</span>
                        <span className="px-2 py-1 bg-desert-beige rounded text-xs">{product.category}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProductsSection

