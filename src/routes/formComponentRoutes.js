import express from 'express';
import axios from 'axios';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/', async (req, res) => {
  const { firstName, email, countryCode, phone, website, captchaToken } = req.body;

  if (!captchaToken) return res.status(400).json({ message: 'Captcha required' });

  try {
    // Verify reCAPTCHA with Google
    const captchaRes = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: '6LeFRVsrAAAAAKQD_Om5HCQe5WVReExgEM6js4cA',
        response: captchaToken
      }
    });

    if (!captchaRes.data.success) {
      return res.status(400).json({ message: 'Captcha verification failed' });
    }

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mwsplpitambar@gmail.com',
        pass: 'Pitambar@2025'
      }
    });

    const mailOptions = {
      from: email,
      to: 'pitambermajhi33@gmail.com',
      subject: 'New Contact Form Submission',
      html: `
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
        <p><strong>Website:</strong> ${website}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
