// utils/sendEmail.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  // secure: false, // true for port 465
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});



const sendVerificationEmail = async (email, token) => {
  const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
   console.log(email)
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "Verify your email",
    html: `
    <h2>Welcome to NaukriPakki!</h2>
  <p>Thank you for registering. Please verify your email by clicking the button below:</p>
  <a href="${verifyLink}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Verify Email</a>
  <p>If you didn’t request this, please ignore this email.</p>
    <p>Please click the link to verify your email:</p>
     <h2>Welcome to NaukriPakki!</h2>
  <p>Thank you for registering. Please verify your email by clicking the button below:</p>
  <a href="${verifyLink}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Verify Email</a>
  <p>If you didn’t request this, please ignore this email.</p>
    <p>Please click the link to verify your email:</p>
           <a href="${verifyLink}">${verifyLink}</a>`,
  };

 

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Verification email sent:", info.messageId);
      }
    });
  } catch (error) {
    console.log("Send mail failed:", error);
  }
};

export default sendVerificationEmail;
