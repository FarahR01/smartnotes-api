import express from 'express';
import * as authController from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('username').notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
  authController.register
);

router.post('/login', authController.login);

router.get('/me', authenticate, authController.profile);
router.put('/me', authenticate, authController.updateProfile);
router.delete('/me', authenticate, authController.deleteAccount);

export default router;
