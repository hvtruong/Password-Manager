const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 3001,
    secure: false,
    auth: {
      user: "MAILID@gmail.com",
      pass: "YOUR PASSWORD",
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

export default SENDMAIL;