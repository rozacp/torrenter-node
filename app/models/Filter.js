/**
 * Filters model
 */

import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   unique: false,
  // },
  name: {
    type: String,
    required: [true, 'Name is required'],
    // unique: false,
  },
  pattern: {
    type: String,
    required: [true, 'Pattern is required'],
  },
  type: {
    type: String,
    validate: {
      validator: type => ['series', 'movies'].includes(type),
      message: 'Valid options are "series" or "movies"',
    },
    required: [true, 'Type is required'],
  },
},
{
  timestamps: true,
});

// schema.index({ user: 1, name: 1 }, { unique: true });

export default mongoose.model('filter', schema);
