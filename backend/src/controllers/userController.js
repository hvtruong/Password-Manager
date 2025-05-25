const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { validateEmailAddress } = require("../utils/email");

// @desc Get all users
// @route GET /user
// @access Private
const getAllUsers = async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select("-password").lean();

    // If no users
    if (!users) {
        return res.status(400).json({ message: "No users found" });
    }

    res.json(users);
};

// @desc Create new user
// @route POST /user
// @access Private
const createNewUser = async (req, res) => {
    const { username, password, emailAddress } = req.body;

    // Confirm data
    if (!username || !password || !emailAddress) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate email address
    const duplicateEmailAddress = await User.findOne({
        emailAddress: emailAddress,
    })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();

    if (duplicateEmailAddress) {
        return res.status(409).json({ message: "Duplicated email address" });
    }

    // Check for duplicate username
    const duplicateUsername = await User.findOne({ username })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();

    if (duplicateUsername) {
        return res.status(409).json({ message: "Duplicated username" });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    // Generate validation token
    // Check for duplicate validation token
    do {
        var validationToken = crypto.randomBytes(20).toString("hex");
        var duplicateValidationToken = await User.findOne({
            validationToken: validationToken,
        })
            .collation({ locale: "en", strength: 2 })
            .lean()
            .exec();
    } while (duplicateValidationToken);

    const userObject = {
        username: username,
        password: hashedPwd,
        emailAddress: emailAddress,
        validationToken: validationToken,
    };

    // Create and store new user
    const user = await User.create(userObject);
    console.log(validationToken);

    if (user) {
        validateEmailAddress(emailAddress, validationToken);
        return res
            .status(201)
            .json({
                message: `New user ${username} created, awaiting validation`,
            });
    } else {
        return res.status(400).json({ message: "Invalid user data received" });
    }
};

// @desc Update a user
// @route PATCH /user
// @access Private
const updateUser = async (req, res) => {
    const { id, emailAddress, username, password } = req.body;

    // Confirm data
    if (!id) {
        return res
            .status(400)
            .json({ message: "User have not logged in!" });
    }
    if (!emailAddress || !username || !password) {
        return res
            .status(400)
            .json({ message: "All fields are required" });
    }

    // Find user by ID
    const foundUser = await User.findById(id).exec();
    if (!foundUser) {
        return res.status(400).json({ message: "User not found" });
    }

    // Check for duplicate email address (excluding current user)
    const duplicateEmail = await User.findOne({ emailAddress })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();
    if (duplicateEmail && duplicateEmail._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicated email address" });
    }

    // Check for duplicate username (excluding current user)
    const duplicateUsername = await User.findOne({ username })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();
    if (duplicateUsername && duplicateUsername._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicated username" });
    }

    // Update fields
    if (foundUser.emailAddress !== emailAddress) {
        foundUser.emailAddress = emailAddress;
    }
    if (foundUser.username !== username) {
        foundUser.username = username;
    }
    if (password && !(await bcrypt.compare(password, foundUser.password))) {
        foundUser.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await foundUser.save();
    console.log("HERE 5")
    res.json({ message: `${updatedUser.username} updated` });
};

// @desc Delete a user
// @route DELETE /user
// @access Private
const deleteUser = async (req, res) => {
    const { id } = req.body;

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: "User ID Required" });
    }

    // Check if the user exist
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const result = await user.deleteOne();

    res.json(`Username ${result.username} deleted`);
};

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
};
