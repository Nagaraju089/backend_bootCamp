const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  //this transporter is a service will send email
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
    //activate 'Less Secure App' in gmail
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'nag <hari@test.io>',
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
