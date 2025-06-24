

// import express from 'express';
// import axios from 'axios';
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// dotenv.config();

// const router = express.Router();

// router.post('/', async (req, res) => {
//   const { firstName, email, countryCode, phone, website,selectServices, bestTimetoCall, captchaToken } = req.body;

//   if (!captchaToken) return res.status(400).json({ message: 'Captcha required' });

//   try {
//     // Verify reCAPTCHA
//     const captchaRes = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
//       params: {
//         secret:'6Lf2glwrAAAAAMbHo2MGjCY3QIGUcEIZj-2UEIR2',
//         response: captchaToken,
//       },
//     });

//     if (!captchaRes.data.success) {
//       return res.status(400).json({ message: 'Captcha verification failed' });
//     }

//     // Send email
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'mwsplpitambar@gmail.com',
//         pass:'zgyi nfja fbdm exhr',
//       },
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
//         <p><strong>select Services:</strong> ${selectServices}</p>
//         <p><strong>best Time to Call:</strong> ${bestTimetoCall}</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     res.json({ message: 'Form submitted successfully!' });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;


// -----------------------------------------------template design-------------------------------------




import express from 'express';
import axios from 'axios';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { firstName, email, countryCode, phone, website,selectServices, bestTimetoCall, captchaToken } = req.body;

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
  <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding-top: 20px;padding-left: 20px; padding-right: 20px; max-width: 600px; margin: auto;">
    
    <!-- Logo + Heading Table -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom: 2px solid #0d6efd; margin-bottom: 20px;">
      <tr>
        <td align="left" style="padding: 0;">
          <img 
            src="https://safarimarketingpro.com/images/smp-logo.png" 
            alt="Safari Marketing Pro Logo" 
            style="max-height: 50px; width: 130px;"
          />
        </td>
        <td align="right" style="padding: 0;">
          <h2 style="color: #0d6efd; font-family: Arial, sans-serif; margin: 0;">Safari Marketing Pro</h2>
        </td>
      </tr>
    </table>

    <!-- Body Content -->
    <p>You have received a new Request A Free Strategies Form form. Below are the details:</p>

    <table style="width: 100%; border-collapse: collapse;">
      <tr><td><strong>First Name:</strong></td><td>${firstName}</td></tr>
      <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
      <tr><td><strong>Phone Number:</strong></td><td>${phone}</td></tr>
      <tr><td><strong>Website:</strong></td><td>${website}</td></tr>
      <tr><td><strong>Select Service:</strong></td><td>${selectServices}</td></tr>
      <tr><td><strong>Best Time To Call:</strong></td><td>${bestTimetoCall}</td></tr>
    </table>

    <p>Regards,<br>Safari Marketing Pro Team</p>

    <!-- Footer -->
    <div style="background-color: #3D3EC2; color: #ffffff; padding: 10px; text-align: center; margin-top: 30px;">
      © 2024 - 2025 By Safari Marketing Pro.<br>
      Lameck Laaya Moshi Tz, 1518, Tanzania
    </div>
  </div>
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
