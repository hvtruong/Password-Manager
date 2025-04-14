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

    User.findOneAndUpdate(
        { 'validationToken': token },
        { $unset: { 'validationToken': '' } }
    )
    .exec()
    .then ((loadedUser) => {
        if (!loadedUser) {
            return res.status(400).json({ message: 'Validation link has expired!'})
        }
        loadedUser.validated = true
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