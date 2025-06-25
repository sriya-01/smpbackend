// // routes/contact.js
// import express from 'express';
// import nodemailer from 'nodemailer';
// import axios from 'axios';

// const router = express.Router();

// router.post('/', async (req, res) => {
//   const {
//     firstName, email, countryCode, phone,
//     website, service, timeToCall, captchaToken
//   } = req.body;

//   if (!captchaToken)
//     return res.status(400).json({ message: "Captcha required" });

//   // 1. Verify reCAPTCHA
//   const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;
//   const { data } = await axios.post(verifyURL);

//   if (!data.success)
//     return res.status(400).json({ message: "Failed reCAPTCHA verification" });

//   // 2. Send email
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS, // Use App Password
//       },
//     });

//     const mailOptions = {
//       from:process.env.EMAIL_USER,
//       to: TO_EMAIL,
//       subject: 'New Free Strategy Session Request',
//       html: `
//         <h3>New Request</h3>
//         <p><strong>Name:</strong> ${firstName}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${countryCode} ${phone}</p>
//         <p><strong>Website:</strong> ${website}</p>
//         <p><strong>Service:</strong> ${service}</p>
//         <p><strong>Best Time To Call:</strong> ${timeToCall}</p>
//       `,
//     };

//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: 'Form submitted successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to send email.' });
//   }
// });

// export default router;
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
       html: `


  <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding-top: 20px;padding-left: 20px; padding-right: 20px; max-width: 600px; margin: auto;">


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
    <p style="text-align: center;> You’ve received a new inquiry from the “Find Out How We Can Accelerate Your Booking Flow Online” form on your website. Here are the submitted details:</p>

 <table style="width: 100%; border-collapse: collapse; text-align: center;">
      <tr><td><strong>First Name:</strong></td><td>${firstName}</td></tr>
      <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
      <tr><td><strong>Phone Number:</strong></td><td>${countryCode} ${phone}</td></tr>
      <tr><td><strong>Message:</strong></td><td>${website}</td></tr>
           <tr><td><strong>Message:</strong></td><td>${timeToCall}</td></tr>

    </table>


    <p>Regards,<br>Safari Marketing Pro Team</p>

    <!-- Footer -->
    <div style="background-color: #3D3EC2; color: #ffffff; padding: 10px; text-align: center; margin-top: 30px;">
      © 2024 - 2025 By Safari Marketing Pro.<br>
      Lameck Laaya Moshi Tz, 1518, Tanzania
    </div>

</div>

      `
      ,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

export default router;
