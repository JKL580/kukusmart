import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

// Get all articles
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let query = {};
    
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { excerpt: new RegExp(search, 'i') },
        { content: new RegExp(search, 'i') }
      ];
    }
    
    const articles = await Article.find(query).sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single article by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Increment views
    article.views += 1;
    await article.save();
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    // Increment views
    article.views += 1;
    await article.save();
    
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create article (admin only - for now open)
router.post('/', async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;