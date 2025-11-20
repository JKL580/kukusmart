import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ArrowLeft, Clock, Eye, User } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ArticleDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/articles/slug/${slug}`);
      setArticle(response.data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
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

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h2>
          <button onClick={() => navigate('/learning')} className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Back to Learning Centre
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/learning')}
          className="flex items-center text-amber-700 hover:text-amber-800 mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Learning Centre
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Featured Image */}
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-96 object-cover"
          />

          {/* Article Content */}
          <div className="p-8 md:p-12">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                {article.category.replace('-', ' ')}
              </span>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{article.readTime} min read</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                <span>{article.views} views</span>
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span>{article.author}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{article.title}</h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{article.excerpt}</p>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Related Articles CTA */}
        <div className="mt-12 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Want to Learn More?</h3>
          <p className="mb-6">Explore more articles in our Learning Centre</p>
          <button
            onClick={() => navigate('/learning')}
            className="bg-white text-amber-700 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
          >
            Browse All Articles
          </button>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetails;
