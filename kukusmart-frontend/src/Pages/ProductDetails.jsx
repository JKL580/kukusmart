import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Cart from '../components/Cart';
import { MapPin, Phone, ShoppingCart, ArrowLeft, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in ${product.name} (KSh ${product.price})`;
    const phone = product.seller?.whatsapp || product.seller?.phone;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button onClick={() => navigate('/marketplace')} className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar />
      <Cart />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/marketplace')}
          className="flex items-center text-amber-700 hover:text-amber-800 mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Marketplace
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-4">
              <img
                src={product.images && product.images[selectedImage] ? product.images[selectedImage] : 'https://via.placeholder.com/600'}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-lg overflow-hidden ${
                      selectedImage === idx ? 'ring-4 ring-amber-600' : ''
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Category Badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 mb-4">
                {product.category.replace('-', ' ')}
              </span>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {product.breed && (
                <p className="text-lg text-gray-600 mb-4">
                  Breed: <span className="font-semibold">{product.breed}</span>
                </p>
              )}

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-amber-700">
                  KSh {product.price.toLocaleString()}
                </span>
                {product.category.includes('chicks') && (
                  <span className="text-gray-500 ml-2">per piece</span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.quantity > 0 ? (
                  <p className="text-green-600 font-semibold">
                    ✓ In Stock ({product.quantity} available)
                  </p>
                ) : (
                  <p className="text-red-600 font-semibold">✗ Out of Stock</p>
                )}
              </div>

              {/* Quantity Selector */}
              {product.quantity > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-semibold"
                    >
                      -
                    </button>
                    <span className="text-xl font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                      className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={product.quantity === 0}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <ShoppingCart className="w-5 h-5 mr-2 inline" />
                  Add to Cart
                </button>
                <button onClick={handleWhatsApp} className="flex-1 bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold border-2 border-amber-600 hover:bg-amber-50 transition-all duration-300">
                  <MessageCircle className="w-5 h-5 mr-2 inline" />
                  WhatsApp Seller
                </button>
              </div>

              {/* Description */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-bold text-lg mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Seller Info */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="font-bold text-lg mb-3">Seller Information</h3>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Name:</span> {product.seller?.name}
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    {product.seller?.phone}
                  </p>
                  <p className="text-gray-700 flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    {product.location}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;