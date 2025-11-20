import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ArticleCard from '../components/ArticleCard';
import { Search, BookOpen } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const LearningCentre = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'brooding', label: 'Brooding' },
    { value: 'feeding', label: 'Feeding' },
    { value: 'housing', label: 'Housing' },
    { value: 'water-management', label: 'Water Management' },
    { value: 'incubation', label: 'Incubation' },
    { value: 'health', label: 'Health' },
    { value: 'business', label: 'Business' },
  ];

  useEffect(() => {
    fetchArticles();
  }, [categoryFilter]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const params = categoryFilter ? `?category=${categoryFilter}` : '';
      const response = await axios.get(`${API_URL}/articles${params}`);
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-amber-700 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Learning Centre</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive guides and best practices for successful poultry farming
          </p>
        </div>

        {/* Featured Topics */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white mb-12">
          <h2 className="text-2xl font-bold mb-6">Popular Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setCategoryFilter('brooding')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all text-left"
            >
              <div className="font-bold mb-1">🐣 Brooding</div>
              <div className="text-sm opacity-90">Raising chicks</div>
            </button>
            <button
              onClick={() => setCategoryFilter('feeding')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all text-left"
            >
              <div className="font-bold mb-1">🌾 Feeding</div>
              <div className="text-sm opacity-90">Nutrition guide</div>
            </button>
            <button
              onClick={() => setCategoryFilter('housing')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all text-left"
            >
              <div className="font-bold mb-1">🏠 Housing</div>
              <div className="text-sm opacity-90">Farm design</div>
            </button>
            <button
              onClick={() => setCategoryFilter('health')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all text-left"
            >
              <div className="font-bold mb-1">💊 Health</div>
              <div className="text-sm opacity-90">Disease prevention</div>
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all pl-10"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loading-spinner"></div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningCentre;