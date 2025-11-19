import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Egg } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { getCartCount, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r from-amber-700 to-orange-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Egg className="w-8 h-8" />
            <span className="font-bold text-xl">KukuSmart</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="hover:text-amber-200 transition-colors font-medium">
              Marketplace
            </Link>
            <Link to="/diseases" className="hover:text-amber-200 transition-colors font-medium">
              Diseases
            </Link>
            <Link to="/learning" className="hover:text-amber-200 transition-colors font-medium">
              Learning
            </Link>
            <Link to="/sell" className="hover:text-amber-200 transition-colors font-medium">
              Sell Products
            </Link>
            
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-amber-200 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden hover:text-amber-200 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link
              to="/marketplace"
              className="block hover:text-amber-200 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link
              to="/diseases"
              className="block hover:text-amber-200 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Diseases
            </Link>
            <Link
              to="/learning"
              className="block hover:text-amber-200 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Learning
            </Link>
            <Link
              to="/sell"
              className="block hover:text-amber-200 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Sell Products
            </Link>
            <button
              onClick={() => {
                setIsCartOpen(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-2 hover:text-amber-200 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart ({getCartCount()})</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;