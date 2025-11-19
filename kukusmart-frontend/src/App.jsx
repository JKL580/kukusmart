import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Dashboard from '../pages/Dashboard';
import Marketplace from '../pages/Marketplace';
import ProductDetails from '../pages/ProductDetails';
import SellerForm from '../pages/SellerForm';
import DiseaseManagement from '../pages/DiseaseManagement';
import DiseaseDetails from '../pages/DiseaseDetails';
import LearningCentre from '../pages/LearningCentre';
import ArticleDetails from '../pages/ArticleDetails';
import Checkout from '../pages/Checkout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/:id" element={<ProductDetails />} />
        <Route path="/sell" element={<SellerForm />} />
        <Route path="/diseases" element={<DiseaseManagement />} />
        <Route path="/diseases/:id" element={<DiseaseDetails />} />
        <Route path="/learning" element={<LearningCentre />} />
        <Route path="/learning/:slug" element={<ArticleDetails />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
