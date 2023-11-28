const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sign in' });
});

router.post('/login', async function(req, res, next) {
  const data = {
    name:req.body.username,
    password:req.body.password
  }
  res.send(data);
});

module.exports = router;