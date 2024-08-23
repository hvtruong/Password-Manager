const express = require('express')
const router = express.Router()
const passwordController = require('../controllers/passwordController')
const verifyJWT = require('../middleware/verifyJWT')

// Allow only authenticated requests by JWT
router.use(verifyJWT)

router.route('/')
    .get(passwordController.getAllPasswords)
    .post(passwordController.createNewPassword)
    .put(passwordController.updatePassword)
    .delete(passwordController.deletePassword)

module.exports = router;