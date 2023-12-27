let HTML_TEMPLATE = require("../views/mail_template.js");
let SENDMAIL = require("../services/mailer.js");
let GENERATETOKEN = require("../services/tokenGenerator.js");

require('dotenv').config()
const express = require('express');
const router = express.Router();

/* Connect to MongoDB */
const connectDB = require('../config/DBConnection');
connectDB();

const userModel = require("../models/User");

/* GET Register page */
router.get('/', function(req, res, next) {
  let errors = [];
  res.render('register', { title: 'Register', errors: errors });
});

/* Handle registration request */
router.post('/', async function(req, res, next) {

  const emailAddress = req.body.emailAddress;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.repeatedPassword;

  let token = GENERATETOKEN();
  const data = {
    emailAddress:emailAddress,
    username:username,
    password:password,
    token:token,
    registered:false
  }

  try {
    /* Check username and password */
    const usernameCheck = await userModel.findOne({ username: username });
    let errors = validityCheck(usernameCheck, password, password2);

    if (errors.length != 0) {
      res.render('register', { title: 'Register', errors:errors });
    }
    else {
      /* Insert temporary user into MongoDB */
      userModel.insertMany([data]);
      
      sendMail(req.body.emailAddress, token);
      
      res.render('authentication', { title: 'Authentication' });
    }
  }
  catch {
    res.render('error', { title: 'Authentication', message: 'Wrong inputs' });
  }
  });

/* Check validity of username in database and secure password */
function validityCheck(usernameCheck, password, repeatedPassword) {
  let errors = [];

  /* Check if username already exists */
  if (usernameCheck != null) {
    errors.push({ text: 'Username already exists' });
  }

  /* Check if password is valid */
  if (password.length < 6) {
    errors.push({ text: 'Password must be greater than 6 characters' });
  }
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (format.test(password) == false) {
    errors.push({ text: 'Password must contain at least one special character' });
  }

  if (password != repeatedPassword) {
    errors.push({ text: 'Please make sure your passwords match' });
  }

  return errors;
}

/* Send verification email with sending time to check for expiration*/
function sendMail(receiver, token) {

  let today = (new Date()).toISOString();
  const url = process.env.BASE_URL + "verify?token=" + token + today;
  let message = "Click on the link to veriy your account: " + url;

  const options = {
    from: "PasswordManager <" + process.env.AUTHENTICATION_ACCOUNT + ">",
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
  
module.exports = router;