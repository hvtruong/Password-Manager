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
    const { id, websites, passwords, secretKey } = req.body; // Extract data from request body

    // Validate required fields
    if (!id || !websites || !passwords || !secretKey) {
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

        for (let i = 0; i < websites.length; i++) {
            const website = websites[i];
            const password = passwords[i];

            // Check if the website already exists in the passwords list
            const websiteExists = passwordsFile.passwords.some(
                (item) => item.website === website
            );

            // If the website exists, return a conflict error
            if (websiteExists) {
                return res
                    .status(409)
                    .json({
                        message: `Website "${website}" with a password already exists`,
                    });
            }

            // Encrypt the password using the provided secret key
            const encryptedPassword = encryptPassword(password, secretKey);
            // Add the new website and encrypted password to the list
            passwordsFile.passwords.push({
                website: website,
                password: encryptedPassword,
            });
        }
        
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
    const { id, password, secretKey, index } = req.body; // Extract data from request body
    console.log("Body ", req.body);
    // Validate required fields
    if (!id || !password || !secretKey || index < 0) {
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
        const newPassword = encryptPassword(password, secretKey);

        // Update the password for the specified website
        loadedPasswords.passwords[index].password = newPassword;

        // Save the updated document
        await loadedPasswords.save();

        // Return success response
        return res.json({
            message: `Password for "${loadedPasswords.passwords[index].website}" updated`,
        });
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
    console.log("HERE 1")
    // Validate required fields
    if (!id) {
        return res.status(400).json({ message: "User ID required" });
    }
    console.log("HERE 1")
    try {
        // Find the password document by its ID
        const passwordsFile = await Password.findOne({ userId: id })
            .collation({ locale: "en", strength: 2 })
            .exec();

        // If no document is found, return an error
        if (!passwordsFile) {
            return res.status(400).json({ message: "Password file not found" });
        }
    console.log("HERE 1")
        // Delete the password document
        result = passwordsFile.passwords.splice(index, 1);

        await passwordsFile.save();
        // Return success response
            console.log("HERE 1")
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
