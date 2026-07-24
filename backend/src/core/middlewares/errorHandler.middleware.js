import ApiError from '../errors/ApiError.js';
import config from '../../config/index.js';

/* eslint-disable no-unused-vars */
export function errorHandler(err, req, res, next) {
  let { statusCode, message } = err;

  if (!(err instanceof ApiError)) {
    statusCode = 500;
    message = config.env === 'production' ? 'Something went wrong' : err.message;
  }

  if (!statusCode) statusCode = 500;

  if (config.env !== 'production' && !(err instanceof ApiError)) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(config.env !== 'production' && !(err instanceof ApiError) && { stack: err.stack }),
  });
}