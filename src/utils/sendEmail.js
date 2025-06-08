import nodemailer from 'nodemailer';

export const sendResetEmail = async (email, token) => {
  const resetURL = `http://localhost:8000/reset-password/${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: 'noreply@example.com',
    to: email,
    subject: 'Password Reset',
    html: `<p>Click <a href="${resetURL}">here</a> to reset your password.</p>`,
  });
};
