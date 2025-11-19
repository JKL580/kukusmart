// Simple authentication middleware for sellers
// This is a lightweight implementation for MVP
// For production, implement JWT-based authentication

export const authenticateSeller = (req, res, next) => {
  // For now, this is a placeholder
  // In MVP, we're using simple phone-based identification
  // No token-based auth required yet
  
  const { sellerPhone } = req.headers;
  
  if (!sellerPhone) {
    return res.status(401).json({ 
      message: 'Seller phone number required' 
    });
  }
  
  req.sellerPhone = sellerPhone;
  next();
};

// Optional: Verify seller exists
export const verifySeller = async (req, res, next) => {
  try {
    const Seller = (await import('../models/Seller.js')).default;
    const seller = await Seller.findOne({ phone: req.sellerPhone });
    
    if (!seller) {
      return res.status(404).json({ 
        message: 'Seller not found' 
      });
    }
    
    req.seller = seller;
    next();
  } catch (error) {
    res.status(500).json({ 
      message: 'Authentication error',
      error: error.message 
    });
  }
};

// Admin middleware (for future use)
export const authenticateAdmin = (req, res, next) => {
  // Placeholder for admin authentication
  // Implement when adding admin dashboard
  const { adminToken } = req.headers;
  
  if (adminToken !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ 
      message: 'Admin access required' 
    });
  }
  
  next();
};

export default {
  authenticateSeller,
  verifySeller,
  authenticateAdmin
};