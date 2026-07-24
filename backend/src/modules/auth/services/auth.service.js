import User from "../../users/models/user.model.js";
import { generateAccessToken } from "./token.service.js";
import ApiError from "../../../core/errors/ApiError.js";

/**
 * Registers a new user.
 * @param {{name: string, email: string, password: string}} payload
 * @returns {Promise<{user: object, token: string}>}
 */
export async function register(payload) {
    const { name, email, password } = payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "An account with this email already exists");
    }

    const user = await User.create({ name, email, password });
    const token = generateAccessToken(user._id.toString());

    return { user, token };
}

/**
 * Authenticates a user with email and password.
 * @param {{email: string, password: string}} payload
 * @returns {Promise<{user: object, token: string}>}
 */
export async function login(payload) {
    const { email, password } = payload;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    if (!user.isActive) {
        throw new ApiError(403, "This account has been deactivated");
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    const token = generateAccessToken(user._id.toString());

    return { user, token };
}