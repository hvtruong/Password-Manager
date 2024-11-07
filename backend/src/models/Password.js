const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    passwords: {
        type: Map,
        default: undefined,
        required: true
    }
})

module.exports = new mongoose.model('password', passwordSchema)