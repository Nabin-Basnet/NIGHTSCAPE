"use client"
import { useLocation, useNavigate, Link } from "react-router-dom"
import { CheckCircle, Tag, DollarSign, Calendar, Info, Home } from "lucide-react"

const OrderSummary = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state?.order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 text-center">
        <Info className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <p className="text-gray-600 text-2xl font-semibold mb-4">No order data found.</p>
        <p className="text-gray-500 text-lg mb-8">It seems you landed here without a valid order. Please try again.</p>
        <Link
          to="/"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <Home className="w-5 h-5 mr-2" />
          Go to Home
        </Link>
      </div>
    )
  }

  const { id, total_amount, order_date, status } = state.order

  // Format date for better readability
  const formattedOrderDate = order_date
    ? new Date(order_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "N/A"

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-200 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-xl text-gray-600">Thank you for your purchase. Your order details are below.</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
          <div className="flex items-center p-6 border-b border-gray-200">
            <Tag className="w-6 h-6 mr-3 text-orange-500" />
            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-2 border-gray-100">
              <p className="text-gray-700 font-medium flex items-center">
                <Tag className="w-4 h-4 mr-2 text-gray-500" />
                Order ID:
              </p>
              <span className="font-semibold text-gray-900">{id}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2 border-gray-100">
              <p className="text-gray-700 font-medium flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                Total Amount:
              </p>
              <span className="font-semibold text-green-600 text-xl">${total_amount?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2 border-gray-100">
              <p className="text-gray-700 font-medium flex items-center">
                <Info className="w-4 h-4 mr-2 text-gray-500" />
                Status:
              </p>
              <span className="font-semibold text-gray-900 capitalize">{status}</span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                Order Date:
              </p>
              <span className="font-semibold text-gray-900">{formattedOrderDate}</span>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
