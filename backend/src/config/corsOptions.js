const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions