require('dotenv').config()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 3001,
    secure: true,
    auth: {
      user: process.env.AUTHENTICATION_ACCOUNT,
      pass: process.env.AUTHENTICATION_PW,
    },
});


const SENDMAIL = async (mailDetails, callback) => {
    try {
      const info = await transporter.sendMail(mailDetails)
      callback(info);
    } catch (error) {
      console.log(error);
    } 
};

module.exports = SENDMAIL;