require('dotenv').config()
const mongoose = require('mongoose')

const DBconnection = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = DBconnection