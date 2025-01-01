const User = require("../models/User")
const Password = require("../models/Password")

// @desc Get all passwords
// @route GET /passwords
// @access Private
const getAllPasswords = async (req, res) => 
{
    // Get all passwords of user from MongoDB
    const { username } = req.body

    const usernameCheck = await User.findOne({ username }).collation({ locale: "en", strength: 2 }).lean().exec()
    const savedPasswords = await Password.findOne({ "username": username }).lean().exec()

    if (!usernameCheck) 
    {
        return res.status(401).json({ message: "No valid user exist" })
    }

    // If no passwords found
    if (!savedPasswords?.length) 
    {
        return res.status(400).json({ message: "No passwords found" })
    }

    return res.json(savedPasswords.passwordsJson)
}

// @desc Create new password
// @route POST /passwords
// @access Private
const createNewPassword = async (req, res) => 
{
    const { id, newPasswordName, password } = req.body

    console.log(id)
    console.log(newPasswordName)
    console.log(password)
    // Confirm data
    if (!id || !newPasswordName || !password) 
    {
        return res.status(400).json({ message: "All fields are required" })
    }

    var passwordsFile = await Password.findOne({ "userId": id }).collation({ locale: "en", strength: 2 }).exec()

    // Create and store the new password
    // Check if passwords file has been created
    if (!passwordsFile) 
    {
        const passwordFileObject = { "userId": id, "passwords": new Map() }
        passwordsFile = await Password.create(passwordFileObject)
    }

    // Check for duplicate name
    const duplicatedName = passwordsFile.passwords.get() == newPasswordName

    if (duplicatedName) {
        return res.status(409).json({ message: "Name with a password already exists" })
    }
    passwordsFile.passwords.set(newPasswordName, password)
    passwordsFile.save()

    if (passwordsFile) { // Created
        return res.status(201).json({ message: "New password created" })
    }
    else
    {
        return res.status(400).json({ message: "Invalid password data received" })
    }

}

// @desc Update a password
// @route PATCH /passwords
// @access Private
const updatePassword = async (req, res) => 
{
    const { username, name, newPassword } = req.body

    // Confirm data
    if (!username || !name || !newPassword) 
    {
        return res.status(400).json({ message: "All fields are required" })
    }

    // Confirm password exists to update
    const loadedPasswords = await Password.findById(username).exec()

    if (!loadedPasswords) {
        return res.status(400).json({ message: "Passwords not found" })
    }

    loadedPasswords.passwordsJson[name] = newPassword

    const updatedPassword = await loadedPasswords.update()

    res.json(`"${updatedPassword.passwordsJson[name]}" updated`)
}

// @desc Delete a password
// @route DELETE /passwords
// @access Private
const deletePassword = async (req, res) => 
{
    const { id } = req.body

    // Confirm data
    if (!id) 
    {
        return res.status(400).json({ message: "Password ID required" })
    }

    // Confirm password exists to delete 
    const password = await Password.findById(id).exec()

    if (!password) 
    {
        return res.status(400).json({ message: "Password not found" })
    }

    const result = await password.deleteOne()

    const reply = `Password "${result.title}" with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = 
{
    getAllPasswords,
    createNewPassword,
    updatePassword,
    deletePassword
}