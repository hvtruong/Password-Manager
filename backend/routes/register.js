const express = require('express');
const router = express.Router();

const connectDB = require('../config/DBConnection');
connectDB();

var userModel = require("../models/User");

/* GET Register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/', async function(req, res, next) {
    const data = {
      username:req.body.username,
      password:req.body.password,
      emailAddress:req.body.emailAddress
    }

    const checking = await userModel.findOne({username: req.body.username})
    try{
        if (checking != null) {
            res.render('error', { title: 'Authentication', message: 'User details already exists' });
        }
        else {
            /* GET Authentication page. */
            res.render('authenticationNotice', { title: 'Authentication' });
            userModel.insertMany([data]);
        }
    }
    catch{
        res.render('error', { title: 'Authentication', message: 'Wrong inputs' });
    }
});
  
module.exports = router;