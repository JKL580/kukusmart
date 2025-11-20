import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Egg, ShoppingBag, BookOpen, Syringe, ArrowRight } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-800 to-orange-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Egg className="w-16 h-16 md:w-20 md:h-20 mr-4 animate-pulse" />
              <h1 className="text-5xl md:text-7xl font-bold">KukuSmart</h1>
            </div>
            <p className="text-xl md:text-3xl mb-4 text-amber-100 font-semibold">
              Modern Digital Poultry Management Ecosystem
            </p>
            <p className="text-lg md:text-xl text-amber-200 max-w-2xl mx-auto mb-8">
              Empowering Kenyan farmers with smart tools for poultry farming success
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg flex items-center mx-auto"
            >
              Get Started <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need in One Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From buying and selling to disease management and learning - we've got you covered
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Marketplace Card */}
          <button
            onClick={() => navigate('/marketplace')}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 text-left"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3">
              Marketplace
            </h2>
            <p className="text-gray-600 mb-4">
              Buy and sell day-old chicks, mature chickens, feeds, and poultry products. Connect directly with verified sellers.
            </p>
            <div className="flex items-center text-amber-700 font-semibold group-hover:text-orange-600">
              Browse Products
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

          {/* Disease Management Card */}
          <button
            onClick={() => navigate('/diseases')}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 text-left"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
              <Syringe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3">
              Disease Management
            </h2>
            <p className="text-gray-600 mb-4">
              Vaccination schedules, biosecurity practices, and comprehensive disease prevention guides with expert advice.
            </p>
            <div className="flex items-center text-red-700 font-semibold group-hover:text-pink-600">
              Learn More
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

          {/* Learning Centre Card */}
          <button
            onClick={() => navigate('/learning')}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 text-left"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl mb-6 group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-amber-900 mb-3">
              Learning Centre
            </h2>
            <p className="text-gray-600 mb-4">
              Complete knowledge hub for brooding, feeding, housing, and best practices from industry experts.
            </p>
            <div className="flex items-center text-green-700 font-semibold group-hover:text-emerald-600">
              Start Learning
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-amber-700 to-orange-700 rounded-2xl p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1000+</div>
              <div className="text-amber-100 text-lg">Active Farmers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-amber-100 text-lg">Products Listed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-amber-100 text-lg">Learning Resources</div> 
            </div>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Why Choose KukuSmart?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold mr-4">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1"> Accurate, Trusted Information — No More Facebook Guesswork
                    </h4>
                  <p className="text-gray-600">
                    Farmers often depend on random Facebook posts that give wrong advice - leading to sick birds, heavy losses, and confusion.
                    At KukuSmart, every guide is research-based, written with input from vets and experienced poultry experts so you always know exactly what to do.

                    </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold mr-4">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Secure, Transparent Buying and Selling
                  </h4>
                  <p className="text-gray-600">No more being conned, overcharged, or meeting unreliable buyers.
                  Our marketplace connects you to real farmers and verified sellers across Kenya, with safe payments and clear pricing.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold mr-4">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Expert Support for Healthy, Profitable Flocks</h4>
                  <p className="text-gray-600"> You gain access to up-to-date disease information, vaccination schedules, symptoms, prevention, photos of infections, and expert treatment options — curated with vets to help you reduce flock mortality. </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold mr-4">✓</div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Fair Prices for Farmers Everywhere</h4>
                  <p className="text-gray-600">Whether you are selling chicks, eggs, or mature birds, KukuSmart ensures you get fair market prices without brokers taking advantage of you. Direct connection. No exploitation.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-8 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600"
              alt="Poultry farming"
              className="rounded-xl shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Egg className="w-8 h-8 mr-2" />
                <span className="font-bold text-xl">KukuSmart</span>
              </div>
              <p className="text-amber-200">
                Empowering Kenyan poultry farmers with modern digital tools for success.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-amber-200">
                <li><button onClick={() => navigate('/marketplace')} className="hover:text-white">Marketplace</button></li>
                <li><button onClick={() => navigate('/diseases')} className="hover:text-white">Diseases</button></li>
                <li><button onClick={() => navigate('/learning')} className="hover:text-white">Learning</button></li>
                <li><button onClick={() => navigate('/sell')} className="hover:text-white">Sell Products</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2 text-amber-200">
                <li>Email: info@kukusmart.co.ke</li>
                <li>Phone: +254 700 000 000</li>
                <li>Location: Nairobi, Kenya</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-amber-800 pt-8 text-center text-amber-200">
            <p>© 2024 KukuSmart. Empowering Kenyan Poultry Farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
