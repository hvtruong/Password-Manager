import HTML_TEMPLATE from "../views/mail-template.js";
import SENDMAIL from "../services/mailer.js" 

const express = require('express');
const router = express.Router();

function sendMail(receiver, message) {
  const message = "Hi there, you were emailed me through nodemailer"
  const options = {
    from: "PasswordManager <pwmanagerauthentication@gmail.com>",
    to: receiver,
    subject: "Password Manager Authentication",
    text: message,
    html: HTML_TEMPLATE(message),
  }

  SENDMAIL(options, (info) => {
    console.log("Email sent successfully");
    console.log("MESSAGE ID: ", info.messageId);
  });
}

/* Connect to MongoDB */
const connectDB = require('../config/DBConnection');
connectDB();

var userModel = require("../models/User");

/* GET Register page */
router.get('/', function(req, res, next) {
  let errors = [];
  res.render('register', { title: 'Register', errors: errors });
});

/* Handle registration request */
router.post('/', async function(req, res, next) {
    const data = {
      emailAddress:req.body.emailAddress,
      username:req.body.username,
      password:req.body.password,
      registered:false
    }

    /* Check out existing username */
    const checking = await userModel.findOne({username: req.body.username})
    try{
        if (checking != null) {
            let errors = [];
            errors.push({text:'User details already exists'})
            res.render('register', { title: 'Register', errors:errors });
        }
        else {
            /* Insert temporary user into MongoDB */
            userModel.insertMany([data]);
            res.render('authentication', { title: 'Authentication' });
        }
    }
    catch{
        res.render('error', { title: 'Authentication', message: 'Wrong inputs' });
    }
  });
  
module.exports = router;