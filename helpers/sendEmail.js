const nodemailer = require('nodemailer');
require('dotenv').config();

const { EMAIL_HOST, EMAIL_PORT, EMAIL_GMAIL_NAME, EMAIL_GMAIL_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: true, // порт 465 вимагає SSL
  auth: {
    user: EMAIL_GMAIL_NAME,
    pass: EMAIL_GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // ігнорує самопідписані сертифікати
  },
});

const sendEmail = async data => {
  const email = {
    ...data,
    from: EMAIL_GMAIL_NAME,
  };

  try {
    await transport.sendMail(email);
    console.log('Send mail successfully');
  } catch (err) {
    console.error('Error sending mail:', err.message);
  }
};

module.exports = sendEmail;