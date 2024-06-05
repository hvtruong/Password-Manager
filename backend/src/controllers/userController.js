const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const fs = require('fs');

// @desc Post a new password
// @route POST /dashboard
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    try {
        console.log("ABC");
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
})

module.exports = {
    createNewUser
}