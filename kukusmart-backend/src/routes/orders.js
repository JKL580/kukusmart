import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Create order
router.post('/', async (req, res) => {
  try {
    const orderNumber = 'KS' + Date.now();
    
    const order = await Order.create({
      ...req.body,
      orderNumber
    });
    
    const populatedOrder = await Order.findById(order._id).populate('items.product');
    
    res.status(201).json(populatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get order by order number
router.get('/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber })
      .populate('items.product');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order payment status
router.patch('/:orderNumber/payment', async (req, res) => {
  try {
    const { paymentStatus, mpesaReceiptNumber } = req.body;
    
    const order = await Order.findOneAndUpdate(
      { orderNumber: req.params.orderNumber },
      { paymentStatus, mpesaReceiptNumber, orderStatus: 'confirmed' },
      { new: true }
    );
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;