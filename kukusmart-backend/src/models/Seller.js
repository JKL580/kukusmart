import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  whatsapp: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Seller', sellerSchema);
