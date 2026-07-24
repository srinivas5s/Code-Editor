import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { validate } from '../../../core/middlewares/validate.middleware.js';
import { authenticate } from '../../../core/middlewares/authenticate.middleware.js';
import { registerSchema, loginSchema } from '../validations/auth.validation.js';

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.get('/me', authenticate, authController.getCurrentUser);

export default router;