import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // ADD THIS LINE
import Landing from './Pages/Landing';
import Dashboard from './Pages/Dashboard';
import Marketplace from './Pages/Marketplace';
import ProductDetails from './Pages/ProductDetails';
import SellerForm from './Pages/SellerForm';
import DiseaseManagement from './Pages/DiseaseManagement';
import DiseaseDetails from './Pages/DiseaseDetails';
import LearningCentre from './Pages/LearningCentre';
import ArticleDetails from './Pages/ArticleDetails';
import Checkout from './Pages/Checkout';

function App() {
  return (
    <CartProvider> {/* ADD THIS WRAPPER */}
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
    </CartProvider> 
  );
}

export default App;