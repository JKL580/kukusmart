import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Cart from '../components/Cart';
import { ShoppingBag, Syringe, BookOpen, Package, Users } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Listings', value: '500+', icon: Package, color: 'bg-blue-500' },
    { label: 'Registered Sellers', value: '200+', icon: Users, color: 'bg-green-500' },
    { label: 'Learning Articles', value: '50+', icon: BookOpen, color: 'bg-purple-500' },
    { label: 'Disease Guides', value: '25+', icon: Syringe, color: 'bg-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar />
      <Cart />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-amber-700 to-orange-700 rounded-2xl p-8 md:p-12 text-white mb-12 shadow-xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to KukuSmart! 🐔
          </h1>
          <p className="text-lg md:text-xl text-amber-100 mb-6">
            Your one-stop platform for modern poultry farming management
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('/marketplace')}
              className="bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
            >
              Start Shopping
            </button>
            <button
              onClick={() => navigate('/sell')}
              className="bg-amber-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-900 transition-colors border-2 border-white"
            >
              Sell Products
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Marketplace */}
          <button
            onClick={() => navigate('/marketplace')}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 text-left"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3">Marketplace</h2>
            <p className="text-gray-600 mb-4">
              Browse and purchase day-old chicks, mature chickens, feeds, equipment and more
            </p>
            <div className="flex items-center text-amber-700 font-semibold group-hover:text-orange-600">
              Explore Now
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* Disease Management */}
          <button
            onClick={() => navigate('/diseases')}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 text-left"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
              <Syringe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3">Disease Management</h2>
            <p className="text-gray-600 mb-4">
              Vaccination schedules, biosecurity practices, and disease prevention guides
            </p>
            <div className="flex items-center text-red-700 font-semibold group-hover:text-pink-600">
              View Guides
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          {/* Learning Centre */}
          <button
            onClick={() => navigate('/learning')}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 text-left"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3">Learning Centre</h2>
            <p className="text-gray-600 mb-4">
              Comprehensive guides on brooding, feeding, housing, and farming best practices
            </p>
            <div className="flex items-center text-green-700 font-semibold group-hover:text-emerald-600">
              Start Learning
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/marketplace?category=day-old-chicks')}
              className="p-4 border-2 border-amber-200 rounded-lg hover:border-amber-600 hover:bg-amber-50 transition-all text-left"
            >
              <div className="font-semibold text-gray-900 mb-1">Buy Chicks</div>
              <div className="text-sm text-gray-600">Day-old chicks available</div>
            </button>
            <button
              onClick={() => navigate('/marketplace?category=feeds')}
              className="p-4 border-2 border-amber-200 rounded-lg hover:border-amber-600 hover:bg-amber-50 transition-all text-left"
            >
              <div className="font-semibold text-gray-900 mb-1">Browse Feeds</div>
              <div className="text-sm text-gray-600">Quality poultry feeds</div>
            </button>
            <button
              onClick={() => navigate('/diseases')}
              className="p-4 border-2 border-amber-200 rounded-lg hover:border-amber-600 hover:bg-amber-50 transition-all text-left"
            >
              <div className="font-semibold text-gray-900 mb-1">Health Guide</div>
              <div className="text-sm text-gray-600">Disease prevention tips</div>
            </button>
            <button
              onClick={() => navigate('/sell')}
              className="p-4 border-2 border-amber-200 rounded-lg hover:border-amber-600 hover:bg-amber-50 transition-all text-left"
            >
              <div className="font-semibold text-gray-900 mb-1">List Product</div>
              <div className="text-sm text-gray-600">Start selling today</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;