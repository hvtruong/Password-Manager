const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    registered: {
        type: Boolean,
        default: false
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model('user', userSchema)