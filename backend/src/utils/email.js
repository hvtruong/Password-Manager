require('dotenv').config()

const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)

const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
    )
  
    oauth2Client.setCredentials({
        refresh_token: process.env.EMAIL_REFRESH_TOKEN
    })
  
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                reject()
            }
            resolve(token)
            console.log(token)
        })
    })
  
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            accessToken,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.EMAIL_REFRESH_TOKEN
        }
    })
  
    return transporter
}

const sendEmail = async (emailOptions) => {
    let emailTransporter = await createTransporter()
    await emailTransporter.sendMail(emailOptions)
}

const validateEmailAddress = async (emailAddress, validationToken) => {

    const templateString = await readFile(path.resolve(__dirname, './emailMessage.ejs'), 'utf-8')
    const data = {
        token: validationToken
    }
    const html = ejs.render(templateString, data)

    const options = {
        to: emailAddress,
        subject: 'Welcome to PassVault, just one more step to verify your account',
        html: html,
        attachments: [{
            filename: 'logo_black.png',
            path: `${__dirname}/../../assets/images/logo_black.png`,
            cid: 'logo_black'
        }]
    }

    sendEmail(options)
}

module.exports = {
    validateEmailAddress
}