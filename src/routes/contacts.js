// routes/contact.js
import express from 'express';
import nodemailer from 'nodemailer';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  const {
    firstName, email, countryCode, phone,
    website, service, timeToCall, captchaToken
  } = req.body;

  if (!captchaToken)
    return res.status(400).json({ message: "Captcha required" });

  // 1. Verify reCAPTCHA
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;
  const { data } = await axios.post(verifyURL);

  if (!data.success)
    return res.status(400).json({ message: "Failed reCAPTCHA verification" });

  // 2. Send email
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password
      },
    });

    const mailOptions = {
      from:process.env.EMAIL_USER,
      to: TO_EMAIL,
      subject: 'New Free Strategy Session Request',
      html: `
        <h3>New Request</h3>
        <p><strong>Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
        <p><strong>Website:</strong> ${website}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Best Time To Call:</strong> ${timeToCall}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

export default router;
