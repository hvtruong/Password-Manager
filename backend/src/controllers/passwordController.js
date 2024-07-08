const Password = require('../models/Password')
const User = require('../models/User')

// @desc Get all passwords
// @route GET /passwords
// @access Private
const getAllPasswords = async (req, res) => {
    // Get all passwords from MongoDB
    const passwords = await Password.find().lean()

    // If no passwords 
    if (!passwords?.length) {
        return res.status(400).json({ message: 'No passwords found' })
    }

    // Add username to each password before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const passwordsWithUser = await Promise.all(passwords.map(async (password) => {
        const user = await User.findById(password.user).lean().exec()
        return { ...password, username: user.username }
    }))

    res.json(passwordsWithUser)
}

// @desc Create new password
// @route POST /passwords
// @access Private
const createNewPassword = async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Password.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate password title' })
    }

    // Create and store the new user 
    const password = await Password.create({ user, title, text })

    if (password) { // Created 
        return res.status(201).json({ message: 'New password created' })
    } else {
        return res.status(400).json({ message: 'Invalid password data received' })
    }

}

// @desc Update a password
// @route PATCH /passwords
// @access Private
const updatePassword = async (req, res) => {
    const { id, user, title, text, completed } = req.body

    // Confirm data
    if (!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm password exists to update
    const password = await Password.findById(id).exec()

    if (!password) {
        return res.status(400).json({ message: 'Password not found' })
    }

    // Check for duplicate title
    const duplicate = await Password.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original password 
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate password title' })
    }

    password.user = user
    password.title = title
    password.text = text
    password.completed = completed

    const updatedPassword = await password.save()

    res.json(`'${updatedPassword.title}' updated`)
}

// @desc Delete a password
// @route DELETE /passwords
// @access Private
const deletePassword = async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Password ID required' })
    }

    // Confirm password exists to delete 
    const password = await Password.findById(id).exec()

    if (!password) {
        return res.status(400).json({ message: 'Password not found' })
    }

    const result = await password.deleteOne()

    const reply = `Password '${result.title}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    getAllPasswords,
    createNewPassword,
    updatePassword,
    deletePassword
}