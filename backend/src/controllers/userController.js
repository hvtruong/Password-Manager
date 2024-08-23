const User = require('../models/User')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { validateEmailAddress } = require('../utils/email')

// @desc Get all users
// @route GET /user
// @access Private
const getAllUsers = async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
}

// @desc Create new user
// @route POST /user
// @access Private
const createNewUser = async (req, res) => {
    const { username, password, emailAddress } = req.body

    // Confirm data 
    if (!username || !password || !emailAddress) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate email address
    const duplicateEmailAddress = await User.findOne({ 'emailAddress': emailAddress }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicateEmailAddress) {
        return res.status(409).json({ message: 'Duplicated email address' })
    }

    // Check for duplicate username
    const duplicateUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicateUsername) {
        return res.status(409).json({ message: 'Duplicated username' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    // Generate validation token
    // Check for duplicate validation token
    // Registered users have this value set to 1, otherwise it is a validation token that will expire in 3 hours
    do {
        var validationToken = crypto.randomBytes(20).toString('hex')
        var duplicateValidationToken = await User.findOne({ 'registered': validationToken}).collation({ locale: 'en', strength: 2 }).lean().exec()
    } 
    while (duplicateValidationToken)

    const userObject = { username, 'password': hashedPwd, 'emailAddress': emailAddress, 'registered': validationToken }

    // Create and store new user 
    const user = await User.create(userObject)
    console.log(validationToken)

    if (user) {
        validateEmailAddress(emailAddress, validationToken)
        return res.status(201).json({ message: `New user ${username} created, awaiting validation` })
    } 
    else {
        return res.status(400).json({ message: 'Invalid user data received' })
    }
}

// @desc Update a user
// @route PATCH /user
// @access Private
const updateUser = async (req, res) => {
    const { id, username, password } = req.body

    // Confirm data 
    if (!id || !username || !password) {
        return res.status(400).json({ message: 'All fields except password are required' })
    }

    // Check if the user exist
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    // Check for duplicate 
    const duplicateUsername = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow updates to the original user 
    if (duplicateUsername && duplicateUsername._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicated username' })
    }

    user.username = username

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
}

// @desc Delete a user
// @route DELETE /user
// @access Private
const deleteUser = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Check if the user exist
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const result = await user.deleteOne()

    res.json(`Username ${result.username} deleted`)
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}