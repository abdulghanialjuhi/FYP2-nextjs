// models/Image.js

import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.models.Image || mongoose.model('Image', imageSchema);
