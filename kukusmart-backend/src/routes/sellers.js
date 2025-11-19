import express from 'express';
import Seller from '../models/Seller.js';
import Product from '../models/Product.js';

const router = express.Router();

// Get all sellers
router.get('/', async (req, res) => {
  try {
    const sellers = await Seller.find().sort({ createdAt: -1 });
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single seller with their products
router.get('/:id', async (req, res) => {
  try {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    
    const products = await Product.find({ seller: req.params.id, status: 'active' });
    
    res.json({ seller, products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Simple seller authentication by phone
router.post('/auth', async (req, res) => {
  try {
    const { phone } = req.body;
    
    const seller = await Seller.findOne({ phone });
    
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }
    
    res.json({ seller });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;