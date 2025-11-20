import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { ArrowLeft, AlertTriangle, Syringe, Shield, Phone } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const DiseaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [disease, setDisease] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDisease();
  }, [id]);

  const fetchDisease = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/diseases/${id}`);
      setDisease(response.data);
    } catch (error) {
      console.error('Error fetching disease:', error);
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

  if (!disease) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Disease guide not found</h2>
          <button onClick={() => navigate('/diseases')} className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Back to Diseases
          </button>
        </div>
      </div>
    );
  }

  const severityColors = {
    low: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    critical: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/diseases')}
          className="flex items-center text-amber-700 hover:text-amber-800 mb-6 font-semibold"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Diseases
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Image */}
          <div className="relative h-72">
            <img
              src={disease.images && disease.images[0] ? disease.images[0] : 'https://via.placeholder.com/800x300'}
              alt={disease.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <span className={`inline-block px-4 py-2 rounded-full font-bold border-2 mb-4 ${severityColors[disease.severity]}`}>
                  {disease.severity.toUpperCase()} SEVERITY
                </span>
                <h1 className="text-4xl font-bold">{disease.name}</h1>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Description */}
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">{disease.description}</p>
            </div>

            {/* Symptoms */}
            <div className="bg-red-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Symptoms</h2>
              </div>
              <ul className="space-y-2">
                {disease.symptoms && disease.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-600 font-bold mr-3">•</span>
                    <span className="text-gray-700">{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Causes */}
            <div className="bg-orange-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-orange-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Causes</h2>
              </div>
              <ul className="space-y-2">
                {disease.causes && disease.causes.map((cause, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-600 font-bold mr-3">•</span>
                    <span className="text-gray-700">{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatment */}
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Syringe className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Treatment</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{disease.treatment}</p>
            </div>

            {/* Prevention */}
            {disease.prevention && disease.prevention.length > 0 && (
              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Prevention</h2>
                </div>
                <ul className="space-y-2">
                  {disease.prevention.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 font-bold mr-3">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* When to Call Vet */}
            {disease.whenToCallVet && (
              <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-600">
                <div className="flex items-center mb-4">
                  <Phone className="w-6 h-6 text-amber-700 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">When to Call a Vet</h2>
                </div>
                <p className="text-gray-700 leading-relaxed font-semibold">{disease.whenToCallVet}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetails;

