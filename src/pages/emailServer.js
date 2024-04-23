require('dotenv').config(); // Add this line at the very top
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace the hardcoded credentials with environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER, // Environment variable for the email
    pass: process.env.GMAIL_PASS  // Environment variable for the password
  }
});

app.post('/send-email', (req, res) => {
  const { feedback } = req.body;
  const mailOptions = {
    from: process.env.GMAIL_USER, // Use the email from the environment variable
    to: 'horizonwildlife1@gmail.com',
    subject: 'New Feedback Submission',
    text: feedback
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email: ' + error.message);
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent: ' + info.response);
  });
});

const PORT = process.env.PORT || 3000; // Use the environment variable for PORT or default to 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
