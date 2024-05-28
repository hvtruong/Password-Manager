const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const fs = require('fs');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const PasswordManager = require("../utils/binding.js");

var passwordManager = new PasswordManager("");

// @desc Get all passwords
// @route GET /dashboard
// @access Private
const getAllPasswords = asyncHandler(async (req, res) => {

    let json = passwordManager.exportToString();
    res.render('dashboard', {title: 'Dashboard', json:json});
})

// @desc Post a new password
// @route POST /dashboard
// @access Private
const createNewPassword = asyncHandler(async (req, res) => {
    try {
        const {website, password, retypedPassword} = req.body;

        if (password != retypedPassword) {
            res.status(500).json({message: "Unmatched password"});
        }
        
        passwordManager.insertSite(website);
        passwordManager.insertPassword(password);

        // Re render the password table
        let json = passwordManager.exportToString()
        res.render('dashboard', {title: 'Dashboard', json:json});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
})

// @desc Update a password
// @route PUT /dashboard
// @access Private
const updatePassword = asyncHandler(async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
})

// @desc Delete a password
// @route DELETE /dashboard
// @access Private
const deletePassword = asyncHandler(async (req, res) => {
    try {
        passwordManager.insertSite(req.body.website);
        passwordManager.insertPassword(req.body.password);

        // Re render the password table
        let json = passwordManager.exportToString();
        res.render('dashboard', {title: 'Dashboard', json:json});
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"});
    }
})

// @desc Delete a password
// @route DELETE /dashboard
// @access Private
const loadPasswordFromFile = asyncHandler(async (req, res) => {
    try {
        passwordManager.insertSite(req.body.website);
        passwordManager.insertPassword(req.body.password);

        // Re render the password table
        let json = passwordManager.exportToString();
        res.render('dashboard', {title: 'Dashboard', json:json});
    } catch (error) {
        return res.status(500).json({message: "Something went wrong"});
    }
})

const something = asyncHandler(async (req, res) => {
    let file = req.file;
    await upload(file);
})

module.exports = {
    getAllPasswords,
    createNewPassword,
    updatePassword,
    deletePassword,
    loadPasswordFromFile,
    something
}