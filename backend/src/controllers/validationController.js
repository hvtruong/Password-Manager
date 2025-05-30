const User = require("../models/User");

// @desc Validate user by token
// @route PATCH /validate/
// @access Private
const validateUser = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ message: "Invalid validation token." });
    }

    try {
        const user = await User.findOne({ validationToken: token }).exec();
        if (!user) {
            return res
                .status(400)
                .json({ message: "Validation link has expired!" });
        }
        if (user.validated) {
            return res.status(200).json({
                message: `User ${user.username} has already been validated.`,
            });
        }
        user.validated = true;
        await user.save();
        return res.status(200).json({
            message: `User ${user.username} has been validated.`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

module.exports = { validateUser };
