

import express from 'express';
import axios from 'axios';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, countryCode, phone, message, captchaToken } = req.body;

  if (!captchaToken) return res.status(400).json({ message: 'Captcha required' });

  try {
    // Verify reCAPTCHA
    const captchaRes = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret:'6Lf2glwrAAAAAMbHo2MGjCY3QIGUcEIZj-2UEIR2',
        response: captchaToken,
      },
    });

    if (!captchaRes.data.success) {
      return res.status(400).json({ message: 'Captcha verification failed' });
    }

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mwsplpitambar@gmail.com',
        pass:'zgyi nfja fbdm exhr',
      },
    });

    const mailOptions = {
      from: email,
      to: 'pitambermajhi33@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
        <p><strong>First Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
        <p><strong>Website:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
