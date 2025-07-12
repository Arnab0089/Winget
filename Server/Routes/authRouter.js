import express from 'express';
import { login, signup } from '../Path/auth.js';
import {
  loginValidation,
  signupValidation,
} from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', loginValidation, login);

router.post('/signup', signupValidation, signup);

export default router;
