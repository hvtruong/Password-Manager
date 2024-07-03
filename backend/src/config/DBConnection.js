require('dotenv').config()
const mongoose = require('mongoose')

const DBconnection = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
    }
    catch (err) {
        console.log(err)
    }
}

DBconnection();
database = mongoose.connection;

module.exports = database;