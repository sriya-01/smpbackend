const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
 
// Signup route
router.post('/signup', authController.signup);
 
// Login route
router.post('/login', authController.login);
 
// Logout route
router.post('/logout', authController.logout);
router.get('/check-auth', (req, res) => {
  if (req.session.user) {
    res.status(200).json({ authenticated: true, user: req.session.user });
  } else {
    res.status(401).json({ authenticated: false });
  }
});
 
module.exports = router;