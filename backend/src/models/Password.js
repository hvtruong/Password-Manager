const mongoose = require('mongoose')

const passwordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    passwords: {
        type: Array,
        required: true
    }
})

module.exports = new mongoose.model('password', passwordSchema)