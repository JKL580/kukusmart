import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import DiseaseCard from '../components/DiseaseCard';
import { Search, Download, Calendar } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const DiseaseManagement = () => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('');

  useEffect(() => {
    fetchDiseases();
  }, [severityFilter]);

  const fetchDiseases = async () => {
    try {
      setLoading(true);
      const params = severityFilter ? `?severity=${severityFilter}` : '';
      const response = await axios.get(`${API_URL}/diseases${params}`);
      setDiseases(response.data);
    } catch (error) {
      console.error('Error fetching diseases:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDiseases = diseases.filter((disease) =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    disease.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const vaccinationSchedule = [
    { age: 'Day 1', vaccine: "Marek's Disease", method: 'Injection (at hatchery)' },
    { age: 'Day 7', vaccine: 'Newcastle (Hitchner B1)', method: 'Eye drop / Drinking water' },
    { age: 'Day 14', vaccine: 'Gumboro (IBD)', method: 'Drinking water' },
    { age: 'Day 21', vaccine: 'Newcastle (Lasota)', method: 'Drinking water' },
    { age: 'Day 28', vaccine: 'Gumboro Booster', method: 'Drinking water' },
    { age: 'Week 6-8', vaccine: 'Fowl Pox', method: 'Wing web stab' },
    { age: 'Week 8-10', vaccine: 'Newcastle (Lasota)', method: 'Drinking water' },
    { age: 'Week 16-18', vaccine: 'Layer vaccines (if layers)', method: 'As per vet guidance' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Poultry Disease Management
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive guides on poultry diseases, prevention strategies, and vaccination schedules
          </p>
        </div>

        {/* Vaccination Schedule */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-amber-700 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Vaccination Schedule</h2>
            </div>
            <button className="bg-white text-amber-700 px-6 py-3 rounded-lg font-semibold border-2 border-amber-600 hover:bg-amber-50 transition-all duration-300 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-amber-100">
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Age</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Vaccine</th>
                  <th className="px-6 py-3 text-left font-semibold text-gray-900">Method</th>
                </tr>
              </thead>
              <tbody>
                {vaccinationSchedule.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-amber-50">
                    <td className="px-6 py-4 font-semibold text-amber-700">{item.age}</td>
                    <td className="px-6 py-4 text-gray-900">{item.vaccine}</td>
                    <td className="px-6 py-4 text-gray-600">{item.method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Biosecurity Best Practices */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl p-8 text-white mb-12">
          <h2 className="text-2xl font-bold mb-6">Biosecurity Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-bold mb-2">✓ Prevent Entry</h3>
              <ul className="text-sm space-y-1">
                <li>• Footbaths at all entry points</li>
                <li>• Limit visitors to farm</li>
                <li>• Quarantine new birds for 2 weeks</li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-bold mb-2">✓ Clean & Disinfect</h3>
              <ul className="text-sm space-y-1">
                <li>• Daily removal of dead birds</li>
                <li>• Weekly disinfection of equipment</li>
                <li>• All-in, all-out management</li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-bold mb-2">✓ Monitor Health</h3>
              <ul className="text-sm space-y-1">
                <li>• Daily observation of birds</li>
                <li>• Record mortality and symptoms</li>
                <li>• Call vet if unusual symptoms</li>
              </ul>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <h3 className="font-bold mb-2">✓ Control Pests</h3>
              <ul className="text-sm space-y-1">
                <li>• Prevent rodent access</li>
                <li>• Control wild bird entry</li>
                <li>• Regular pest control measures</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search diseases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all pl-10"
              />
            </div>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
            >
              <option value="">All Severities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Diseases Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDiseases.map((disease) => (
              <DiseaseCard key={disease._id} disease={disease} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseManagement;
