import mongoose from 'mongoose';

const diseaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  symptoms: [{
    type: String
  }],
  causes: [{
    type: String
  }],
  treatment: {
    type: String,
    required: true
  },
  prevention: [{
    type: String
  }],
  images: [{
    type: String
  }],
  whenToCallVet: {
    type: String
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  }
}, {
  timestamps: true
});

export default mongoose.model('Disease', diseaseSchema);
