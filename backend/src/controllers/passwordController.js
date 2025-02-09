const Password = require("../models/Password");

// @desc Get all passwords
// @route GET /passwords
// @access Private
const getPasswordsById = async (req, res) => {
    const userId = req.params.id;

    try {
        const savedPasswords = await Password.findOne({ userId }).lean().exec();

        if (!savedPasswords) {
            return res.json([]);
        }
        return res.json(savedPasswords.passwords);
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

// @desc Create new password
// @route POST /passwords
// @access Private
const createNewPassword = async (req, res) => {
    const { id, newWebsite, password } = req.body;

    if (!id || !newWebsite || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        let passwordsFile = await Password.findOne({ userId: id }).collation({ locale: "en", strength: 2 }).exec();

        if (!passwordsFile) {
            passwordsFile = new Password({ userId: id, passwords: [] });
        }

        const websiteExists = passwordsFile.passwords.some(item => item.website === newWebsite);

        if (websiteExists) {
            return res.status(409).json({ message: "Name with a password already exists" });
        }

        passwordsFile.passwords.push({ website: newWebsite, password });
        await passwordsFile.save();

        return res.status(201).json({ message: "New password created" });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

// @desc Update a password
// @route PATCH /passwords
// @access Private
const updatePassword = async (req, res) => {
    const { username, name, newPassword } = req.body;

    if (!username || !name || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const loadedPasswords = await Password.findById(username).exec();

        if (!loadedPasswords) {
            return res.status(400).json({ message: "Passwords not found" });
        }

        loadedPasswords.passwordsJson[name] = newPassword;
        await loadedPasswords.save();

        return res.json({ message: `Password for "${name}" updated` });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

// @desc Delete a password
// @route DELETE /passwords
// @access Private
const deletePassword = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: "Password ID required" });
    }

    try {
        const password = await Password.findById(id).exec();

        if (!password) {
            return res.status(400).json({ message: "Password not found" });
        }

        const result = await password.deleteOne();
        return res.json({ message: `Password with ID ${result._id} deleted` });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getPasswordsById,
    createNewPassword,
    updatePassword,
    deletePassword,
};
