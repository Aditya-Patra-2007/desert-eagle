function CropCard({ crop }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 bg-desert-beige rounded-full flex items-center justify-center mr-4">
          <span className="text-3xl">{crop.icon}</span>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-desert-green-dark">
            {crop.name}
          </h3>
          <p className="text-sm text-gray-600">{crop.variety}</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className="font-medium text-desert-green">{crop.status}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Growth Stage:</span>
          <span className="font-medium">{crop.growthStage}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Harvest Date:</span>
          <span className="font-medium">{crop.harvestDate}</span>
        </div>
      </div>
      <button className="mt-4 w-full bg-desert-gold text-white py-2 rounded-md hover:bg-desert-gold-dark transition">
        View Details
      </button>
    </div>
  )
}

export default CropCard

