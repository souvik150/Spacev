const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransporter({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
    // Activate in gmail "less secure app" option
  });

  // 2. Define the email options

  // 3. Send the email
  // 4. Log the error if any
  // 5. Return the message
};
