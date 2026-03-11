import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.DOCTOR_EMAIL;
const pass = process.env.EMAIL_PASS 

console.log("SMTP USER:", user);
console.log("SMTP PASS:", pass ? "Loaded" : "Missing");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: user,
    pass: pass,
  },
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: user,
    to,
    subject,
    html,
  });
};

export default sendEmail;