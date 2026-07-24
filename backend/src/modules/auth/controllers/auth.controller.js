import * as authService from '../services/auth.service.js';
import config from '../../../config/index.js';

const COOKIE_NAME = 'accessToken';

const cookieOptions = {
  httpOnly: true,
  secure: config.env === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, matches token expiry
};

/**
 * POST /api/auth/register
 */
export async function register(req, res, next) {
  try {
    const { user, token } = await authService.register(req.body);

    res.cookie(COOKIE_NAME, token, cookieOptions);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: { user },
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * POST /api/auth/login
 */
export async function login(req, res, next) {
  try {
    const { user, token } = await authService.login(req.body);

    res.cookie(COOKIE_NAME, token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: { user },
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * POST /api/auth/logout
 */
export async function logout(req, res, next) {
  try {
    res.clearCookie(COOKIE_NAME, cookieOptions);

    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * GET /api/auth/me
 * Returns the currently authenticated user.
 * Relies on auth middleware (Part 5) attaching req.user.
 */
export async function getCurrentUser(req, res, next) {
  try {
    return res.status(200).json({
      success: true,
      data: { user: req.user },
    });
  } catch (error) {
    return next(error);
  }
}