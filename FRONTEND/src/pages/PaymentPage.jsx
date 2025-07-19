"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import AxiosInstance from "../Components/Axios"
import { MapPin, NotebookPen, Wallet, CheckCircle, Loader2, ShoppingCart, ArrowRight } from "lucide-react"

const PaymentPage = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [notes, setNotes] = useState("")
  const [placingOrder, setPlacingOrder] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCartAndAddresses = async () => {
      try {
        const [cartRes, addressesRes] = await Promise.all([
          AxiosInstance.get("/carts/"),
          AxiosInstance.get("/addresses/"),
        ])
        setCartItems(cartRes.data)
        setAddresses(addressesRes.data)
        if (addressesRes.data.length > 0) {
          setSelectedAddress(addressesRes.data[0].id)
        }
      } catch (error) {
        console.error("Failed to load cart items or addresses:", error)
        alert("Failed to load necessary data. Please try again.")
      } finally {
        setLoading(false)
      }
    }
    fetchCartAndAddresses()
  }, [])

  const handleCashPayment = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address.")
      return
    }
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.")
      navigate("/products")
      return
    }

    setPlacingOrder(true)
    try {
      const totalAmount = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0), 0)
      const orderItems = cartItems.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
      }))

      const orderData = {
        address_id: selectedAddress,
        notes,
        items: orderItems,
        total_amount: totalAmount,
      }

      const res = await AxiosInstance.post("/orders/", orderData)
      const order = res.data

      // Clear the cart after successful order
      await AxiosInstance.delete("/carts-clear/")

      navigate("/order-summary", { state: { order } })
    } catch (error) {
      console.error("Error placing order:", error)
      if (error.response && error.response.data) {
        const messages = Object.entries(error.response.data)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
          .join("\n")
        alert("Could not place your order:\n" + messages)
      } else {
        alert("Could not place your order. Please try again.")
      }
    } finally {
      setPlacingOrder(false)
    }
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0), 0)

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="ml-3 text-lg text-gray-700">Loading checkout details...</p>
      </div>
    )

  if (cartItems.length === 0 && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 text-center">
        <ShoppingCart className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <p className="text-gray-600 text-2xl font-semibold mb-4">Your cart is empty!</p>
        <p className="text-gray-500 text-lg mb-8">Please add items to your cart before proceeding to payment.</p>
        <Link
          to="/products"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Explore Products <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 border border-gray-200 text-center">
          <Wallet className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
          <p className="text-xl text-gray-600">Almost there! Just a few more steps to confirm your purchase.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Address & Notes */}
          <div className="space-y-8">
            {/* Select Delivery Address */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-center p-6 border-b border-gray-200">
                <MapPin className="w-6 h-6 mr-3 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-900">Delivery Address</h2>
              </div>
              <div className="p-6">
                {addresses.length === 0 ? (
                  <div className="text-center py-4 text-gray-600">
                    <p className="mb-4">No addresses found. Please add one in your account settings.</p>
                    <Link
                      to="/account"
                      className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Go to Account Settings <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id}
                        className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="radio"
                          id={`address-${addr.id}`}
                          name="deliveryAddress"
                          value={addr.id.toString()}
                          checked={selectedAddress === addr.id}
                          onChange={(e) => setSelectedAddress(Number.parseInt(e.target.value))}
                          className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                        />
                        <label htmlFor={`address-${addr.id}`} className="flex flex-col flex-1 cursor-pointer">
                          <span className="font-semibold text-gray-900">
                            {addr.street}, {addr.city}
                          </span>
                          <span className="text-gray-600 text-sm">
                            {addr.state} - {addr.zip_code}, {addr.country}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-center p-6 border-b border-gray-200">
                <NotebookPen className="w-6 h-6 mr-3 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-900">Additional Notes</h2>
              </div>
              <div className="p-6">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any delivery instructions or special requests?"
                  className="min-h-[100px] w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Payment */}
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-center p-6 border-b border-gray-200">
                <ShoppingCart className="w-6 h-6 mr-3 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-900">Order Summary</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between pb-2 border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.product?.image || "/placeholder.svg?height=50&width=50"}
                          alt={item.product?.name}
                          className="w-12 h-12 object-cover rounded-md mr-3"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{item.product?.name}</p>
                          <p className="text-sm text-gray-600">
                            ${item.product?.price?.toFixed(2)} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-gray-900">
                        ${((item.product?.price || 0) * (item.quantity || 0)).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-2xl font-bold text-gray-900">Total:</span>
                  <span className="text-3xl font-extrabold text-orange-500">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method & Place Order */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
              <div className="flex items-center p-6 border-b border-gray-200">
                <Wallet className="w-6 h-6 mr-3 text-orange-500" />
                <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-gray-900">Cash on Delivery</span>
                </div>
                <button
                  onClick={handleCashPayment}
                  disabled={placingOrder || addresses.length === 0 || !selectedAddress}
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-xl font-bold px-8 py-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {placingOrder ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-6 h-6 mr-3" />
                      Place Order (Cash on Delivery)
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
