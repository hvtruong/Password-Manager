const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    passwordsJson: {
        type: Object,
        default: undefined
    }
})

module.exports = new mongoose.model('password', passwordSchema)