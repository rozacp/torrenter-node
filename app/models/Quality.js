/**
 * Qualities model
 */

import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
  },
  code: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: false,
  },
},
{
  timestamps: true,
});

export default mongoose.model('quality', schema);
