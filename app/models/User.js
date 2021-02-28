/**
 * Users model
 */

import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User name is required'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    match: [/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    require: true,
  },
  tdUser: {
    type: String,
    require: true,
  },
  tdToken: {
    type: String,
    require: true,
  },
},
{
  timestamps: true,
});

export default mongoose.model('user', schema);

// https://stackoverflow.com/questions/42381683/how-to-check-if-user-with-email-already-exists/52442081
// https://stackoverflow.com/questions/13580589/mongoose-unique-validation-error-type
// https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go
// https://github.com/validatorjs/validator.js#validators
