const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    emailAddress: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registered: {
        type: Boolean,
        default: false
    }
})

module.exports = new mongoose.model('Users', userSchema)