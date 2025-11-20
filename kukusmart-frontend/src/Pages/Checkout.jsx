import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { ArrowLeft, CreditCard, Smartphone } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerPhone: '',
    buyerLocation: '',
    paymentMethod: 'mpesa',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order
      const orderPayload = {
        buyerName: formData.buyerName,
        buyerPhone: formData.buyerPhone,
        buyerLocation: formData.buyerLocation,
        items: cart.map(item => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: getCartTotal(),
        paymentMethod: formData.paymentMethod,
      };

      const orderResponse = await axios.post(`${API_URL}/orders`, orderPayload);
      const order = orderResponse.data;

      if (formData.paymentMethod === 'mpesa') {
        // Initiate M-Pesa STK Push
        const mpesaPayload = {
          phone: formData.buyerPhone,
          amount: getCartTotal(),
          orderNumber: order.orderNumber,
        };

        await axios.post(`${API_URL}/mpesa/stkpush`, mpesaPayload);

        alert(
          `M-Pesa payment request sent to ${formData.buyerPhone}!\n\n` +
          `Order Number: ${order.orderNumber}\n\n` +
          `Please complete the payment on your phone.`
        );
      } else {
        alert(
          `Order placed successfully!\n\n` +
          `Order Number: ${order.orderNumber}\n\n` +
          `The seller will contact you for cash payment and delivery arrangements.`
        );
      }

      clearCart();
      navigate('/marketplace');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <button onClick={() => navigate('/marketplace')} className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/marketplace')}
          className="flex items-center text-amber-700 hover:text-amber-800 mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Shopping
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Buyer Information</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="buyerName"
                    value={formData.buyerName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    placeholder="John Kamau"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="buyerPhone"
                    value={formData.buyerPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    placeholder="254712345678"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Format: 254XXXXXXXXX (for M-Pesa payments)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Location *
                  </label>
                  <input
                    type="text"
                    name="buyerLocation"
                    value={formData.buyerLocation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    placeholder="Nairobi, Kenya"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Payment Method *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-600 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mpesa"
                        checked={formData.paymentMethod === 'mpesa'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <Smartphone className="w-5 h-5 mr-3 text-green-600" />
                      <div>
                        <div className="font-semibold text-gray-900">M-Pesa</div>
                        <div className="text-sm text-gray-500">Pay instantly with M-Pesa</div>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-600 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleChange}
                        className="mr-3"
                      />
                      <CreditCard className="w-5 h-5 mr-3 text-amber-600" />
                      <div>
                        <div className="font-semibold text-gray-900">Cash on Delivery</div>
                        <div className="text-sm text-gray-500">Pay when you receive the items</div>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center space-x-3">
                    <img
                      src={item.images && item.images[0] ? item.images[0] : 'https://via.placeholder.com/60'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.quantity} × KSh {item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="font-semibold text-gray-900">
                      KSh {(item.quantity * item.price).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>KSh {getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-gray-600">
                  <span>Delivery:</span>
                  <span>To be confirmed</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex items-center justify-between text-lg font-bold text-gray-900">
                  <span>Total:</span>
                  <span className="text-amber-700">KSh {getCartTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;