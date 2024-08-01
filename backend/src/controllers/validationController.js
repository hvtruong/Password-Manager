const User = require('../models/User')

// @desc Get all users
// @route Patch /validate/
// @access Private
const validateUser = async (req, res) => {
    // Get all users from MongoDB
    const { token } = req.body
    if (!token) {
        return res.status(400).json({ message: 'Invalid validation token.' })
    }

    User.findOne({ 'registered': token }).exec()
    .then ((loadedUser) => {
        if (!loadedUser) {
            return res.status(400).json({ message: 'Validation link has expired!'})
        }
        loadedUser.registered = '1'
        loadedUser.save()
        return res.status(201).json({ message: `User ${loadedUser.username} has been validated.`})
    })
    .catch(error => {
        console.log(error)
        return res.status(400).json({ message: 'Something went wrong!'})
    })

    return res.status(400)
}

module.exports = { validateUser }