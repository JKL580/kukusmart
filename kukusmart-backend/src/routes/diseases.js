import express from 'express';
import Disease from '../models/Disease.js';

const router = express.Router();

// Get all diseases
router.get('/', async (req, res) => {
  try {
    const { severity, search } = req.query;
    
    let query = {};
    
    if (severity) query.severity = severity;
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }
    
    const diseases = await Disease.find(query).sort({ severity: -1, name: 1 });
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single disease
router.get('/:id', async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    
    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }
    
    res.json(disease);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create disease (admin only - for now open)
router.post('/', async (req, res) => {
  try {
    const disease = await Disease.create(req.body);
    res.status(201).json(disease);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;