const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.route('/')
  .get(passwordController.getAllPasswords)
  .post(passwordController.createNewPassword)
  .put(passwordController.updatePassword)
  .delete(passwordController.deletePassword)

module.exports = router;