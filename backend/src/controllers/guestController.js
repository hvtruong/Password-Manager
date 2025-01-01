const Guest = require("../models/Guest");
const crypto = require("crypto");

// @desc Create new guest
// @route POST /guest
// @access Private
const createNewGuest = async (req, res) => {
    // Generate guest id
    // Check for duplicate id
    do {
        var guestId = crypto.randomBytes(15).toString("hex");
        var duplicateGuestId = await Guest.findOne({ guestId: validationToken })
            .collation({ locale: "en", strength: 2 })
            .lean()
            .exec();
    } while (duplicateGuestId);

    const guestObject = { guestId: guestId };

    // Create and store new user
    const guest = await Guest.create(guestObject);
    console.log(validationToken);

    if (guest) {
        return res.status(201).json({
            message: `New user ${username} created, awaiting validation`,
        });
    } else {
        return res.status(400).json({ message: "An error occurred!" });
    }
};

module.exports = {
    createNewGuest,
};
