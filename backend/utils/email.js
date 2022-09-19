const nodemailer = require('nodemailer');

const sendEmail = async options => {
  
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    // auth: {
    //   user: process.env.EMAIL_USERNAME,
    //   pass: process.env.EMAIL_PASSWORD
    // }
    // Activate in gmail "less secure app" option

    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // 2. Define the email options
  const mailOptions = {
    from: 'Souvik Mukherjee <hello@souvik.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
  // 4. Log the error if any
  // 5. Return the message
};

module.exports = sendEmail;
