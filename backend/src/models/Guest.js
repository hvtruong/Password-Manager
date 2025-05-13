const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestSchema = new Schema({
    guestId: {
        type: String,
        required: true,
        unique: true,
    }
});

guestSchema.index({ expireAfterSeconds: 86400 }); // Guest ID expires after 24 hours

module.exports = new mongoose.model("guest", guestSchema);
