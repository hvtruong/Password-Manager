const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// Connect to MongoDB
const db = require('../config/DBConnection');

// Load schema for user data
const userModel = require("../models/User");

// @desc Post a new password
// @route POST /dashboard
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    try {
        const {username, password, repeatedPassword, emailAddress} = req.body;

        const duplicate = await userModel.findOne({username: req.body.username}).lean().exec();

        if (duplicate) {
            return res.status(409).json({message: 'Duplicate username'})
        }

        // Hash password 
        const hashedPassword = await bcrypt.hash(password, 10) // salt rounds

        const userData = {username, hashedPassword, emailAddress, 'registered': false};

        // Create and store new user 
        const user = await userModel.create(userData)

        if (user) {
            res.status(201).json({ message: `New user ${username} created` })
        } else {
            res.status(400).json({ message: 'Invalid user data received' })
        }
    } catch (error) {
        res.status(500).json({message: 'Something went wrong'});
    }
})

module.exports = {
    createNewUser
}