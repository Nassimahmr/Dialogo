require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendTestEmail() {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
      ignoreTLS: false,
    });

    let info = await transporter.sendMail({
      from: `"Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // s’envoie à toi-même pour test
      subject: 'Test Nodemailer',
      text: 'Ceci est un email de test pour vérifier Nodemailer',
    });

    console.log('Message envoyé : %s', info.messageId);
  } catch (err) {
    console.error('Erreur lors de l’envoi du mail de test:', err);
  }
}

sendTestEmail();
