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
    required: [true, 'name is required'],
    // unique: false,
  },
  pattern: {
    type: String,
    required: [true, 'pattern is required'],
  },
  type: {
    type: String,
    validate: {
      validator: type => ['series', 'movies'].includes(type),
      message: 'Valid options are "series" or "movies"',
    },
    required: [true, 'type is required'],
  },
},
{
  timestamps: true,
});

// schema.index({ user: 1, name: 1 }, { unique: true });

export default mongoose.model('filter', schema);
