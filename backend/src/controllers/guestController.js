const Guest = require("../models/Guest");
const crypto = require("crypto");

// @desc Create new guest
// @route POST /guest
// @access Private
const createNewGuest = async (req, res) => {
    // Generate new guest id
    // Check for duplicate id
    do {
        var newGuestId = crypto.randomBytes(15).toString("hex");
        var duplicateGuestId = await Guest.findOne({ newGuestId })
            .collation({ locale: "en", strength: 2 })
            .lean()
            .exec();
    } while (duplicateGuestId);

    const guestObject = { guestId: newGuestId };

    // Create and store new user

    const guest = await Guest.create(guestObject);

    if (guest) {
        return res.status(201).json({ guestId: newGuestId });
    } else {
        return res.status(400).json({ message: "An error occurred!" });
    }
};

module.exports = { createNewGuest };
