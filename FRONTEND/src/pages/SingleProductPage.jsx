import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Minus, Plus, Heart, ShoppingCart } from "lucide-react";
import AxiosInstance from "../Components/Axios";

const Button = ({ children, ...props }) => (
  <button
    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
    {...props}
  >
    {children}
  </button>
);

const Badge = ({ children, className = "" }) => (
  <span
    className={`px-2 py-1 text-xs font-semibold rounded bg-gray-200 ${className}`}
  >
    {children}
  </span>
);

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await AxiosInstance.get(`products/${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-center py-20">Loading product...</div>;

  const {
    name,
    description,
    price,
    discount,
    stock_quantity,
    rating,
    image,
    category,
    brand,
  } = product;

  const finalPrice = discount
    ? (price * (1 - discount / 100)).toFixed(2)
    : price.toFixed(2);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= stock_quantity) {
      setQuantity(newQuantity);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={i}
          className="w-4 h-4 fill-yellow-400 text-yellow-400"
        />
      );
    }
    if (hasHalfStar)
      stars.push(
        <Star key="half" className="w-4 h-4 text-yellow-300" />
      );
    const remaining = 5 - Math.ceil(rating);
    for (let i = 0; i < remaining; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    // Implement add to cart logic here, e.g.:
    alert(`Added ${quantity} of ${name} to cart.`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <img src={image} alt={name} className="w-full rounded" />
          {discount && (
            <Badge className="absolute top-4 left-4 bg-red-500 text-white">
              {discount}% OFF
            </Badge>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {category && <Badge>{category.name}</Badge>}
            {brand && <span className="text-sm text-gray-500">by {brand.name}</span>}
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center">{renderStars(rating)}</div>
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>

          <p className="text-gray-700 leading-relaxed">
            {description || "No description provided."}
          </p>

          <div className="text-2xl font-bold text-gray-900">${finalPrice}</div>
          {discount && (
            <p className="text-sm text-green-600">
              You save ${(price - parseFloat(finalPrice)).toFixed(2)}
            </p>
          )}

          <div className="flex items-center gap-4">
            <span>Quantity:</span>
            <div className="flex items-center border rounded">
              <Button onClick={() => handleQuantityChange(-1)}><Minus /></Button>
              <div className="px-3">{quantity}</div>
              <Button onClick={() => handleQuantityChange(1)}><Plus /></Button>
            </div>
          </div>

          <div>
            <Button onClick={handleAddToCart}>
              <ShoppingCart className="inline w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
