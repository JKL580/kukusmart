import express from 'express';
import Product from '../models/Product.js';
import Seller from '../models/Seller.js';

const router = express.Router();

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    const { category, breed, minPrice, maxPrice, location, search } = req.query;
    
    let query = { status: 'active' };
    
    if (category) query.category = category;
    if (breed) query.breed = new RegExp(breed, 'i');
    if (location) query.location = new RegExp(location, 'i');
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }
    
    const products = await Product.find(query)
      .populate('seller', 'name phone location')
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name phone whatsapp location');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (seller creates listing)
router.post('/', async (req, res) => {
  try {
    const { sellerInfo, productInfo } = req.body;
    
    // Find or create seller
    let seller = await Seller.findOne({ phone: sellerInfo.phone });
    
    if (!seller) {
      seller = await Seller.create({
        name: sellerInfo.name,
        phone: sellerInfo.phone,
        whatsapp: sellerInfo.whatsapp || sellerInfo.phone,
        location: sellerInfo.location
      });
    }
    
    // Create product
    const product = await Product.create({
      ...productInfo,
      seller: seller._id
    });
    
    const populatedProduct = await Product.findById(product._id)
      .populate('seller', 'name phone location');
    
    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('seller', 'name phone location');
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;