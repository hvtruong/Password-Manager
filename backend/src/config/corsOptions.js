const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions