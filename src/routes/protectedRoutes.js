import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';  // <-- note the relative path

const router = express.Router();

router.get('/protected-route', verifyToken, (req, res) => {
  res.json({ message: `Hello user ${req.user.id}` });
});

export default router;
