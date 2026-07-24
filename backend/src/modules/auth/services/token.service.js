import jwt from "jsonwebtoken";
import config from "../../../config/index.js";

/**
 * Generates a signed JWT access token for a given user id.
 * @param {string} userId
 * @returns {string} signed JWT
 */
export function generateAccessToken(userId) {
    return jwt.sign({ sub: userId }, config.jwt.secret, {
        expiresIn: config.jwt.expiresIn,
    });
}

/**
 * Verifies a JWT and returns its decoded payload.
 * Throws if invalid or expired — caller is responsible for handling.
 * @param {string} token
 * @returns {object} decoded payload
 */
export function verifyAccessToken(token) {
    return jwt.verify(token, config.jwt.secret);
}