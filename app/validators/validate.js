/**
 * Validator Middleware
 */

import { validationResult } from 'express-validator';

export default (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMesseges = [];
    Object.values(errors.mapped()).map(err => errorMesseges.push(`[${err.param}] ${err.msg}`));

    res.status(422);
    throw new Error(`Validation errors - ${errorMesseges.join(', ')}`);
  }

  return next();
};
