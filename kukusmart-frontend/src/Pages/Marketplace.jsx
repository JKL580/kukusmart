import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Cart from '../components/Cart';
import ProductCard from '../components/ProductCard';
import { Search, Filter, Plus } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: '',
    category: searchParams.get('category') || '',
    breed: '',
    minPrice: '',
    maxPrice: '',
    location: '',
  });

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'day-old-chicks', label: 'Day-Old Chicks' },
    { value: 'mature-chickens', label: 'Mature Chickens' },
    { value: 'feeds', label: 'Feeds' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'supplements', label: 'Supplements' },
    { value: 'other', label: 'Other Products' },
  ];

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await axios.get(`${API_URL}/products?${params}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      breed: '',
      minPrice: '',
      maxPrice: '',
      location: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar />
      <Cart />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Poultry Marketplace
            </h1>
            <p className="text-gray-600">
              Browse and purchase quality poultry products from verified sellers
            </p>
          </div>
          <button
            onClick={() => navigate('/sell')}
            className="mt-4 md:mt-0 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Sell Products
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all pl-10"
              />
            </div>

            {/* Category */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>

            {/* Location */}
            <input
              type="text"
              placeholder="Location..."
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            />

            {/* Price Range */}
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {products.length} products
            </p>
            <button
              onClick={clearFilters}
              className="text-amber-700 hover:text-amber-800 font-semibold text-sm"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loading-spinner"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button onClick={clearFilters} className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;