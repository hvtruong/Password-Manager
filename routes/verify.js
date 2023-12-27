const express = require('express');
const router = express.Router();

/* Connect to MongoDB */
const connectDB = require('../config/DBConnection');
connectDB();

/* GET home page. */
router.get('/', function(req, res, next) {
    const token = req.query.token;
    let tokenCheck = userModel.findOne({token: token});

    if (tokenCheck != null) {
        tokenCheck.registered = true;
    }
    res.render('verify', { title: 'Verificiation' });
});

module.exports = router;