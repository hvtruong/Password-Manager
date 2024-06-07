const express = require('express');
const router = express.Router();

/* GET Register page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/', async function(req, res, next) {

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