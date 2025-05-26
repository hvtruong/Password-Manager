const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/')
    .post(userController.createNewUser)

router.route('/')
    .get(userController.getAllUsers)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router;