import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const categoryColors = {
    'day-old-chicks': 'bg-yellow-100 text-yellow-800',
    'mature-chickens': 'bg-green-100 text-green-800',
    'feeds': 'bg-blue-100 text-blue-800',
    'equipment': 'bg-purple-100 text-purple-800',
    'supplements': 'bg-pink-100 text-pink-800',
    'other': 'bg-gray-100 text-gray-800',
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link to={`/marketplace/${product._id}`} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/400'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <span className={`absolute top-2 left-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryColors[product.category] || categoryColors.other}`}>
          {product.category.replace('-', ' ')}
        </span>
        {product.quantity < 10 && product.quantity > 0 && (
          <span className="absolute top-2 right-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Only {product.quantity} left
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
          {product.name}
        </h3>

        {product.breed && (
          <p className="text-sm text-gray-600 mb-2">
            Breed: <span className="font-semibold">{product.breed}</span>
          </p>
        )}

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{product.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-amber-700">
              KSh {product.price.toLocaleString()}
            </span>
            {product.category.includes('chicks') && (
              <span className="text-sm text-gray-500 ml-1">/piece</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
            className={`p-2 rounded-lg transition-all ${
              product.quantity === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {product.quantity === 0 && (
          <p className="text-red-500 text-sm mt-2 font-semibold">Out of Stock</p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;