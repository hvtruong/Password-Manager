const express = require('express');
const router = express.Router();
const validateController = require('../controllers/validationController');

router.route('/')
  .patch(validateController.validateUser)

module.exports = router