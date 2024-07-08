const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.route('/')
  .get(function(req, res, next) {
    res.render('login', { title: 'Login' });
  })
  .post(userController.createNewUser)

module.exports = router;