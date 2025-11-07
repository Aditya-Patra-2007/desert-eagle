function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-desert-beige flex items-center justify-center">
        <span className="text-4xl">🌾</span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-desert-green-dark mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-desert-gold">
            ${product.price}
          </span>
          <button className="bg-desert-green text-white px-4 py-2 rounded-md hover:bg-desert-green-dark transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard

