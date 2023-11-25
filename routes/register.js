const express = require('express');
const router = express.Router();

const connectDB = require('../config/DBConnection');
connectDB();

var userModel = require("../models/User");

/* GET Register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/authenticate', async function(req, res, next) {
    const data = {
      emailAddress:req.body.emailAddress,
      username:req.body.username,
      password:req.body.password
    }

    const checking = await userModel.findOne({username: req.body.username})
    try{
        if (checking != null) {
            res.send("User details already exists");
        }
        else {
            /* GET Authentication page. */
            res.render('authenticate', { title: 'Authentication' });
            userModel.insertMany([data]);
        }
    }
    catch{
        res.send("wrong inputs");
    }
  });
  
module.exports = router;