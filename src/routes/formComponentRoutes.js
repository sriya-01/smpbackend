// import express from 'express';
// import axios from 'axios';
// import nodemailer from 'nodemailer';

// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { firstName, email, countryCode, phone, website, captchaToken } = req.body;

//   if (!captchaToken) return res.status(400).json({ message: 'Captcha required' });

//   try {
//     // Verify reCAPTCHA with Google
//     const captchaRes = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
//       params: {
//         secret: '6LeFRVsrAAAAAKQD_Om5HCQe5WVReExgEM6js4cA',
//         response: captchaToken
//       }
//     });

//     if (!captchaRes.data.success) {
//       return res.status(400).json({ message: 'Captcha verification failed' });
//     }

//     // Send email
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'mwsplpitambar@gmail.com',
//         pass: 'Pitambar@2025'
//       }
//     });

//     const mailOptions = {
//       from: email,
//       to: 'pitambermajhi33@gmail.com',
//       subject: 'New Contact Form Submission',
//       html: `
//         <p><strong>First Name:</strong> ${firstName}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
//         <p><strong>Website:</strong> ${website}</p>
//       `
//     };

//     await transporter.sendMail(mailOptions);
//     res.json({ message: 'Form submitted successfully!' });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;

// import express from 'express';
// import axios from 'axios';
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// import FormSubmission from '../models/FormSubmission.js';

// dotenv.config();
// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { firstName, email, countryCode, phone, website, captchaToken } = req.body;

//   if (!captchaToken) return res.status(400).json({ message: 'Captcha required' });

//   try {
//     // 1. Verify reCAPTCHA
//     const captchaVerify = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
//       params: {
//         secret: process.env.RECAPTCHA_SECRET_KEY,
//         response: captchaToken,
//       },
//     });

//     if (!captchaVerify.data.success) {
//       return res.status(400).json({ message: 'Captcha verification failed' });
//     }

//     // 2. Save form data to DB
//     const submission = new FormSubmission({ firstName, email, countryCode, phone, website });
//     await submission.save();

//     // 3. Setup transporter
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // 4. Send admin email
//     await transporter.sendMail({
//       from: `"Website Contact" <${process.env.EMAIL_USER}>`,
//       to: process.env.TO_EMAIL,
//       subject: 'New Contact Form Submission',
//       html: `
//         <h3>New Contact Submission</h3>
//         <p><strong>Name:</strong> ${firstName}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
//         <p><strong>Website:</strong> ${website}</p>
//       `,
//     });

//     // 5. Send confirmation to user
//     await transporter.sendMail({
//       from: `"Your Company" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: 'We received your submission',
//       html: `
//         <h3>Hello ${firstName},</h3>
//         <p>Thank you for contacting us. We’ve received your details and will be in touch shortly.</p>
//         <h4>Your Submission:</h4>
//         <ul>
//           <li>Name: ${firstName}</li>
//           <li>Email: ${email}</li>
//           <li>Phone: ${countryCode} ${phone}</li>
//           <li>Website: ${website}</li>
//         </ul>
//         <br/>
//         <p>Best regards,<br/>Your Company</p>
//       `,
//     });

//     res.status(200).json({ message: 'Form submitted successfully!' });
//   } catch (err) {
//     console.error('Submission error:', err);
//     res.status(500).json({ message: 'Server error. Please try again later.' });
//   }
// });

// export default router;

import express from 'express';
import axios from 'axios';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { firstName, email, countryCode, phone, website, captchaToken } = req.body;

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
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
        <p><strong>Website:</strong> ${website}</p>
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
