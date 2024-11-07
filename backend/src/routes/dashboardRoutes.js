const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');

router.route('/')
  .get(passwordController.getAllPasswords)
  .post(passwordController.createNewPassword)
  .put(passwordController.updatePassword)
  .delete(passwordController.deletePassword)

module.exports = router;