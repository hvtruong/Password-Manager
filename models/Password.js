const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    passwords: {
        type: Array,
        default: undefined
    }
})

module.exports = mongoose.model('Passwords', passwordSchema)