const allowedOrigins = [
    `${process.env.BASE_URL}`,
    `${process.env.BASE_URL}:80`,
    `${process.env.BASE_URL}:443`
]

module.exports = allowedOrigins