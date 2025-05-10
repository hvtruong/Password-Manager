const Password = require("../models/Password");
const {
    encryptPassword,
    decryptPassword,
} = require("../encryption/encryption");

// @desc Get all passwords for a specific user
// @route GET /passwords/:id
// @access Private
const getPasswordsById = async (req, res) => {
    const id = req.params.id; // Extract user ID from request parameters
    const secretKey = req.query.secretKey; // Extract secret key from query parameters
    console.log(req.params);
    console.log(req.query);
    try {
        // Find the passwords document for the given user ID
        const savedPasswords = await Password.findOne({ userId: id })
            .lean()
            .exec();

        // If no passwords are found, return an empty array
        if (!savedPasswords) {
            console.log("No passwords found for user ID:", id);
            return res.json([]);
        }

        // Return the list of passwords
        const decryptedPasswords = savedPasswords.passwords.map((item) => ({
            website: item.website,
            username: item.username,
            password: decryptPassword(item.password, secretKey),
        }));
        console.log("Decrypted passwords:", decryptedPasswords);
        return res.json(decryptedPasswords);
    } catch (error) {
        // Handle server errors
        return res.status(500).json({ message: "Server error" });
    }
};

// @desc Create a new password entry for a user
// @route POST /passwords
// @access Private
const createNewPassword = async (req, res) => {
    const { id, newWebsite, username, password, secretKey } = req.body; // Extract data from request body

    // Validate required fields
    if (!id || !username || !newWebsite || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Find the passwords document for the user, ignoring case sensitivity
        let passwordsFile = await Password.findOne({ userId: id })
            .collation({ locale: "en", strength: 2 })
            .exec();

        // If no document exists, create a new one
        if (!passwordsFile) {
            passwordsFile = new Password({ userId: id, passwords: [] });
            console.log("No passwords document found, creating a new one");
        }

        // Check if the website already exists in the passwords list
        const websiteExists = passwordsFile.passwords.some(
            (item) => item.website === newWebsite
        );

        // If the website exists, return a conflict error
        if (websiteExists) {
            return res
                .status(409)
                .json({ message: "Website with a password already exists" });
        }

        // Encrypt the password using the provided secret key
        const encryptedPassword = encryptPassword(password, secretKey);
        // Add the new website and encrypted password to the list
        passwordsFile.passwords.push({
            website: newWebsite,
            username: username,
            password: encryptedPassword,
        });
        console.log(passwordsFile.passwords);

        // Save the updated passwords document
        await passwordsFile.save();
        // Return success response
        return res.status(201).json({ message: "New password created" });
    } catch (error) {
        // Handle server errors
        return res.status(500).json({ message: "Server error" });
    }
};

// @desc Update an existing password
// @route PATCH /passwords
// @access Private
const updatePassword = async (req, res) => {
    const { id, newWebsite, newUsername, newPassword, index } = req.body; // Extract data from request body

    // Validate required fields
    if (!newWebsite || !newUsername || !newPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Find the passwords document for the user, ignoring case sensitivity
        let loadedPasswords = await Password.findOne({ userId: id })
            .collation({ locale: "en", strength: 2 })
            .exec();

        // If no document is found, return an error
        if (!loadedPasswords) {
            return res.status(400).json({ message: "Passwords not found" });
        }

        // Encrypt the password using the provided secret key
        const encryptedPassword = encryptPassword(password, secretKey);
        // Update the password for the specified website
        loadedPasswords[index] = {
            website: newWebsite,
            username: newUsername,
            password: encryptedPassword,
        };

        // Save the updated document
        await loadedPasswords.save();

        // Return success response
        return res.json({ message: `Password for "${newUsername}" updated` });
    } catch (error) {
        // Handle server errors
        return res.status(500).json({ message: "Server error" });
    }
};

// @desc Delete a password by its ID
// @route DELETE /passwords
// @access Private
const deletePassword = async (req, res) => {
    const { id, index } = req.body; // Extract password ID from request body

    // Validate required fields
    if (!id) {
        return res.status(400).json({ message: "Password ID required" });
    }

    try {
        // Find the password document by its ID
        const passwordsFile = await Password.findOne({ userId: id })
            .collation({ locale: "en", strength: 2 })
            .exec();

        // If no document is found, return an error
        if (!passwordsFile) {
            return res.status(400).json({ message: "Password file not found" });
        }

        // Delete the password document
        passwordsFile.splice(index, 1);

        await passwordsFile.save();
        // Return success response
        return res.json({ message: `Password with ID ${result._id} deleted` });
    } catch (error) {
        // Handle server errors
        return res.status(500).json({ message: "Server error" });
    }
};

// Export the controller functions
module.exports = {
    getPasswordsById,
    createNewPassword,
    updatePassword,
    deletePassword,
};
