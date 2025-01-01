const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const guestSchema = new Schema({
    guestId: {
        type: String,
        required: true,
        unique: true,
    },
});

guestSchema.index({ expireAt: 1 }, { expireAfterSeconds: 10800 });

guestSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("guest", guestSchema);
