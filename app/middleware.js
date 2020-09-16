/**
 * Middleware
 */

export const auth = (req, res, next) => {
  const authorised = true;
  if (process.env.NODE_ENV === 'development') {
    console.log('FAKE AUTH');
  }

  if (!authorised) {
    res.status(403);
    const error = new Error(`Unauthorised - ${req.originalUrl}`);

    return next(error);
  }

  return next();
};

export const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : '🤷‍♀️',
  });
  next();
};
