/**
 * Handle requests to unknown routes.
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next middleware function.
 * @returns {void}
 */
const notFoundHandler = (req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
};

/**
 * Handle application and parsing errors globally.
 * @param {Error & {status?: number}} err Error object.
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next middleware function.
 * @returns {void}
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({ error: 'Invalid JSON payload' });
    return;
  }

  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({ error: message });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
