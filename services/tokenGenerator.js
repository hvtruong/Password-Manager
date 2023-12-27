require('dotenv').config();
var crypto = require("crypto");
const token_length = 15;

function GENERATETOKEN (){
    for (let i = 0; i < token_length; i++) {
        var token = crypto.randomBytes(token_length).toString('hex');
    }

    return token;
};

module.exports = GENERATETOKEN;