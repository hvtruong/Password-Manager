const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestSchema = new Schema({
    guestId: {
        type: String,
        required: true,
        unique: true,
    },
});

module.exports = new mongoose.model("guest", guestSchema);
