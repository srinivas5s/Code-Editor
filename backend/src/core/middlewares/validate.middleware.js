import ApiError from '../errors/ApiError.js';

/**
 * Returns an Express middleware that validates req.body against the given Joi schema.
 * @param {import('joi').ObjectSchema} schema
 */
export function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ');
      return next(new ApiError(400, message));
    }

    req.body = value;
    return next();
  };
}