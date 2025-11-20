import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Upload, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const SellerForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    sellerName: '',
    phone: '',
    whatsapp: '',
    location: '',
    productName: '',
    category: 'day-old-chicks',
    breed: '',
    price: '',
    quantity: '',
    description: '',
    images: [''],
  });

  const categories = [
    'day-old-chicks',
    'mature-chickens',
    'feeds',
    'equipment',
    'supplements',
    'other',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        sellerInfo: {
          name: formData.sellerName,
          phone: formData.phone,
          whatsapp: formData.whatsapp || formData.phone,
          location: formData.location,
        },
        productInfo: {
          name: formData.productName,
          category: formData.category,
          breed: formData.breed,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
          description: formData.description,
          images: formData.images.filter(img => img.trim() !== ''),
          location: formData.location,
        },
      };

      await axios.post(`${API_URL}/products`, payload);
      alert('Product listed successfully!');
      navigate('/marketplace');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sell Your Products</h1>
          <p className="text-gray-600 mb-8">
            Fill in the details below to list your poultry products on our marketplace
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Seller Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-600">
                Your Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="sellerName"
                    value={formData.sellerName}
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    placeholder="254712345678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    placeholder="254712345678 (optional)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    placeholder="Kiambu, Nairobi"
                  />
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-amber-600">
                Product Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    placeholder="Broiler Day-Old Chicks"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.replace('-', ' ').toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Breed (if applicable)
                    </label>
                    <input
                      type="text"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="Cobb 500, Kienyeji, etc."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price (KSh) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="1000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantity Available *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    placeholder="Describe your product in detail..."
                  />
                </div>

                {/* Image URLs */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Images (URLs)
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Add image URLs (from Unsplash, Imgur, etc.). At least one image recommended.
                  </p>
                  {formData.images.map((img, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-3">
                      <input
                        type="url"
                        value={img}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(index)}
                          className="p-2 text-red-600 hover:text-red-800"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addImageField}
                    className="text-amber-700 hover:text-amber-800 font-semibold text-sm flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Add Another Image
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Submitting...' : 'List Product'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/marketplace')}
                className="flex-1 bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold border-2 border-amber-600 hover:bg-amber-50 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerForm;
