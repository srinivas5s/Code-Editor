import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import config from './config/index.js';
import routes from './routes/index.js';
import { errorHandler } from './core/middlewares/errorHandler.middleware.js';
import ApiError from './core/errors/ApiError.js';

const app = express();

// Core middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true, // required for cookies to be sent cross-origin
  })
);

// Routes
app.use('/api', routes);

// Health check — minimal, per our Infrastructure roadmap item; not a full module yet
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// Unmatched routes
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Global error handler — must be last
app.use(errorHandler);

export default app;