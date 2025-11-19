import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye } from 'lucide-react';

const ArticleCard = ({ article }) => {
  const categoryColors = {
    brooding: 'bg-yellow-100 text-yellow-800',
    feeding: 'bg-green-100 text-green-800',
    housing: 'bg-blue-100 text-blue-800',
    'water-management': 'bg-cyan-100 text-cyan-800',
    incubation: 'bg-purple-100 text-purple-800',
    health: 'bg-red-100 text-red-800',
    business: 'bg-emerald-100 text-emerald-800',
    other: 'bg-gray-100 text-gray-800',
  };

  return (
    <Link to={`/learning/${article.slug}`} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={article.thumbnail || 'https://via.placeholder.com/400x300'}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <span className={`absolute top-3 left-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryColors[article.category] || categoryColors.other}`}>
          {article.category.replace('-', ' ')}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-700 transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{article.readTime} min read</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{article.views || 0} views</span>
            </div>
          </div>
        </div>

        <div className="flex items-center text-amber-700 font-semibold group-hover:text-amber-800">
          Read Article
          <svg
            className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        {/* Author */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">By {article.author || 'KukuSmart Team'}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;