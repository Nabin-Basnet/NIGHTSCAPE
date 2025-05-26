import React, { useState } from "react"
import { Star, Minus, Plus, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"

const Button = ({ children, ...props }) => (
  <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700" {...props}>
    {children}
  </button>
)

const Badge = ({ children, className = "" }) => (
  <span className={`px-2 py-1 text-xs font-semibold rounded bg-gray-200 ${className}`}>{children}</span>
)

const Separator = () => <hr className="my-4 border-gray-200" />

const SingleProductPage = () => {
  const [quantity, setQuantity] = useState(1)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [newReview, setNewReview] = useState({ rating: 0, title: "", comment: "", name: "" })

  const product = {
    name: "Wireless Headphones",
    description:
      "Premium noise-canceling wireless headphones with high-fidelity sound and long-lasting battery life.",
    price: 129.99,
    discount: 20,
    stock_quantity: 15,
    rating: 4.6,
    reviewCount: 234,
    category: "Electronics",
    brand: "SoundMax",
    image: "https://via.placeholder.com/400",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Quick charge (15 min = 3 hours)",
      "Premium leather ear cups",
    ],
  }

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      title: "Excellent sound quality!",
      comment:
        "These headphones exceeded my expectations. The noise cancellation is fantastic.",
      date: "2024-01-15",
      verified: true,
    },
  ]

  const finalPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2)

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= product.stock_quantity) {
      setQuantity(newQuantity)
    }
  }

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const stars = []

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }
    if (hasHalfStar) stars.push(<Star key="half" className="w-4 h-4 text-yellow-300" />)
    const remaining = 5 - Math.ceil(rating)
    for (let i = 0; i < remaining; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }
    return stars
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img src={product.image} alt={product.name} className="w-full rounded" />
          {product.discount && (
            <Badge className="absolute top-4 left-4 bg-red-500 text-white">
              {product.discount}% OFF
            </Badge>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge>{product.category}</Badge>
            <span className="text-sm text-gray-500">by {product.brand}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center">{renderStars(product.rating)}</div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
          </div>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="text-2xl font-bold text-gray-900">${finalPrice}</div>
          {product.discount && (
            <p className="text-sm text-green-600">
              You save ${(product.price - parseFloat(finalPrice)).toFixed(2)}
            </p>
          )}

          <Separator />

          <h3 className="font-semibold">Key Features</h3>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {product.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>

          <Separator />

          <div className="flex items-center gap-4">
            <span>Quantity:</span>
            <div className="flex items-center border rounded">
              <Button onClick={() => handleQuantityChange(-1)}>-</Button>
              <div className="px-3">{quantity}</div>
              <Button onClick={() => handleQuantityChange(1)}>+</Button>
            </div>
          </div>

          <div>
            <Button>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProductPage
