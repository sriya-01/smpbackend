// import express from 'express';
// import { body } from 'express-validator';
// import { validate } from '../middleware/validationMiddleware.js';
// import {
//   register,
//   login,
//   requestPasswordReset,
//   resetPasswordWithToken
// } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/register', [
//   body('username').notEmpty(),
//   body('email').isEmail(),
//   body('password').isLength({ min: 6 }),
// ], validate, register);

// router.post('/login', [
//   body('email').isEmail(),
//   body('password').notEmpty(),
// ], validate, login);

// router.post('/reset-password', [
//   body('email').isEmail(),
// ], validate, requestPasswordReset);

// router.post('/reset-password/:token', [
//   body('password').isLength({ min: 6 }),
// ], validate, resetPasswordWithToken);

// export default router;

import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/protected-user', verifyToken, (req, res) => {
  res.json({ message: `Hello User ${req.user.id}` });
});

router.get('/admin-panel', verifyToken, requireAdmin, (req, res) => {
  res.json({ message: `Hello Admin ${req.user.id}` });
});

export default router;

