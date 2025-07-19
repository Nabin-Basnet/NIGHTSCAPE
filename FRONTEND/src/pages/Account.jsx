"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import AxiosInstance from "../Components/Axios"
import {
  User,
  Mail,
  Briefcase,
  MapPin,
  Plus,
  Trash2,
  LogOut,
  Heart,
  ShoppingCart,
  Settings,
  Loader2,
  ArrowRight,
} from "lucide-react"

export default function Account() {
  const [user, setUser] = useState(null)
  const [addresses, setAddresses] = useState([])
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip_code: "",
    country: "",
  })
  const [loadingUser, setLoadingUser] = useState(true)
  const [loadingAddresses, setLoadingAddresses] = useState(false)
  const [addingAddress, setAddingAddress] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUser(decoded)
        fetchAddresses()
      } catch (error) {
        console.error("Invalid token:", error)
        navigate("/login")
      } finally {
        setLoadingUser(false)
      }
    } else {
      navigate("/login")
    }
  }, [navigate])

  const fetchAddresses = async () => {
    setLoadingAddresses(true)
    try {
      const res = await AxiosInstance.get("/addresses/")
      setAddresses(res.data)
    } catch (err) {
      console.error("Error fetching addresses:", err)
    } finally {
      setLoadingAddresses(false)
    }
  }

  const handleAddressChange = (e) => {
    setNewAddress({
      ...newAddress,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddressSubmit = async (e) => {
    e.preventDefault()
    setAddingAddress(true)
    try {
      await AxiosInstance.post("/addresses/", newAddress)
      setNewAddress({
        street: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
      })
      fetchAddresses()
    } catch (err) {
      console.error("Failed to add address:", err)
    } finally {
      setAddingAddress(false)
    }
  }

  const handleDeleteAddress = async (addressId) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await AxiosInstance.delete(`/addresses/${addressId}/`)
        fetchAddresses()
      } catch (err) {
        console.error("Failed to delete address:", err)
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    navigate("/")
  }

  if (loadingUser)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="ml-3 text-lg text-gray-700">Loading user data...</p>
      </div>
    )

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Card */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-8 border border-gray-200 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white text-5xl font-bold mb-6 shadow-md">
              {user?.name ? user.name.charAt(0).toUpperCase() : <User className="w-12 h-12" />}
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{user?.name || "User Name"}</h2>
            <p className="text-gray-600 flex items-center mb-1">
              <Mail className="w-4 h-4 mr-2 text-gray-500" />
              {user?.email || "user@example.com"}
            </p>
            <p className="text-gray-600 flex items-center mb-4">
              <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
              Role: <span className="capitalize ml-1 font-medium">{user?.role || "customer"}</span>
            </p>
            <button
              onClick={handleLogout}
              className="mt-6 w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-red-600 hover:bg-red-700 transition-colors duration-200 shadow-md"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Addresses Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-orange-500" />
                Your Addresses
              </h2>
              {loadingAddresses ? (
                <div className="text-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-orange-500 mx-auto" />
                  <p className="text-gray-600 mt-2">Loading addresses...</p>
                </div>
              ) : addresses.length === 0 ? (
                <p className="text-gray-600 text-center py-4">No addresses added yet. Add your first address below!</p>
              ) : (
                <div className="space-y-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex items-center justify-between"
                    >
                      <p className="text-gray-800 text-base">
                        {addr.street}, {addr.city}, {addr.state} - {addr.zip_code}, {addr.country}
                      </p>
                      <button
                        onClick={() => handleDeleteAddress(addr.id)}
                        className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                        aria-label="Delete address"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-orange-500" />
                Add New Address
              </h3>
              <form onSubmit={handleAddressSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="street"
                  value={newAddress.street}
                  onChange={handleAddressChange}
                  placeholder="Street Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="city"
                  value={newAddress.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="state"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  placeholder="State / Province"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="zip_code"
                  value={newAddress.zip_code}
                  onChange={handleAddressChange}
                  placeholder="Zip Code"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <input
                  type="text"
                  name="country"
                  value={newAddress.country}
                  onChange={handleAddressChange}
                  placeholder="Country"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={addingAddress}
                  className="md:col-span-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-300 font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {addingAddress ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Save Address
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Other Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Heart className="w-6 h-6 mr-3 text-red-500" />
                  My Wishlist
                </h3>
                <p className="text-gray-600 mb-4">Items you've saved to purchase later.</p>
                <button
                  onClick={() => navigate("/wishlist")}
                  className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
                >
                  View Wishlist <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <ShoppingCart className="w-6 h-6 mr-3 text-blue-500" />
                  My Orders
                </h3>
                <p className="text-gray-600 mb-4">Track your recent purchases and order history.</p>
                <button
                  onClick={() => navigate("/orders")}
                  className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
                >
                  View Orders <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 md:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-6 h-6 mr-3 text-gray-500" />
                  Profile Settings
                </h3>
                <p className="text-gray-600 mb-4">Manage your account information, password, and preferences.</p>
                <button
                  onClick={() => navigate("/profile-settings")}
                  className="text-orange-600 hover:text-orange-700 font-medium flex items-center"
                >
                  Go to Settings <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
