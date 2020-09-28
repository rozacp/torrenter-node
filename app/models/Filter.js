/**
 * Filters model
 */

import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  pattern: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    // required: true,
  },
},
{
  timestamps: true,
});

export default mongoose.model('filter', schema);
