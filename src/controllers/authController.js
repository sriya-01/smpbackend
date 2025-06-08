// import User from '../models/User.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import crypto from 'crypto';
// import { sendResetEmail } from '../utils/sendEmail.js';

// export const register = async (req, res) => {
//   const { username, email, password } = req.body;
//   const hashed = await bcrypt.hash(password, 10);
//   const user = new User({ username, email, password: hashed });
//   await user.save();
//   res.status(201).json({ message: 'User created' });
// };

// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.json({ token });
// };

// export const requestPasswordReset = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) return res.status(404).json({ message: 'User not found' });

//   const token = crypto.randomBytes(32).toString('hex');
//   user.resetToken = token;
//   user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
//   await user.save();

//   await sendResetEmail(user.email, token);
//   res.json({ message: 'Reset email sent' });
// };

// export const resetPasswordWithToken = async (req, res) => {
//   const user = await User.findOne({
//     resetToken: req.params.token,
//     resetTokenExpiry: { $gt: Date.now() },
//   });

//   if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

//   const hashed = await bcrypt.hash(req.body.password, 10);
//   user.password = hashed;
//   user.resetToken = undefined;
//   user.resetTokenExpiry = undefined;
//   await user.save();

//   res.json({ message: 'Password reset successful' });
// };

import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecret';

export const signup = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    res.status(201).json({ message: 'User created. Please login.' });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
