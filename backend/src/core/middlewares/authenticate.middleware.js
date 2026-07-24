import { verifyAccessToken } from '../../modules/auth/services/token.service.js';
import User from '../../modules/users/models/user.model.js';
import ApiError from '../errors/ApiError.js';

/**
 * Verifies the JWT from the accessToken cookie and attaches the user to req.user.
 * Any module can use this on protected routes.
 */
export async function authenticate(req, res, next) {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, 'Authentication required');
    }

    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (err) {
      throw new ApiError(401, 'Invalid or expired session');
    }

    const user = await User.findById(decoded.sub);

    if (!user) {
      throw new ApiError(401, 'User no longer exists');
    }

    if (!user.isActive) {
      throw new ApiError(403, 'This account has been deactivated');
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
}