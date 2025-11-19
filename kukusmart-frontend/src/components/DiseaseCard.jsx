import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Syringe } from 'lucide-react';

const DiseaseCard = ({ disease }) => {
  const severityColors = {
    low: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    critical: 'bg-red-100 text-red-800 border-red-300',
  };

  const severityIcons = {
    low: '✓',
    medium: '!',
    high: '!!',
    critical: '⚠',
  };

  return (
    <Link to={`/diseases/${disease._id}`} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={disease.images && disease.images[0] ? disease.images[0] : 'https://via.placeholder.com/400'}
          alt={disease.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className={`absolute top-2 right-2 px-3 py-1 rounded-full font-bold border-2 ${severityColors[disease.severity]}`}>
          {severityIcons[disease.severity]} {disease.severity.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start mb-3">
          <Syringe className="w-6 h-6 text-red-600 mr-2 flex-shrink-0 mt-1" />
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-amber-700 transition-colors">
            {disease.name}
          </h3>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{disease.description}</p>

        {/* Key Symptoms */}
        {disease.symptoms && disease.symptoms.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Symptoms:</h4>
            <ul className="space-y-1">
              {disease.symptoms.slice(0, 3).map((symptom, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span className="line-clamp-1">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center text-amber-700 font-semibold group-hover:text-amber-800">
          Learn More
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
      </div>
    </Link>
  );
};

export default DiseaseCard;
