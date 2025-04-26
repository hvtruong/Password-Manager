const mongoose = require("mongoose");
const User = require("../models/User");
const Guest = require("../models/Guest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// @desc Login
// @route POST /auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
    const { username, password } = mongoose.sanitizeFilter(req.body);

    // Username and password received check
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Username exist check
    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) {
        return res
            .status(401)
            .json({
                message: "Invalid! Please check your username and password!",
            });
    }

    // User validated check
    if (foundUser.validated === false) {
        return res
            .status(403)
            .json({
                message: "Forbidden access! Please validate your account!",
            });
    }

    // Password check
    const passwordCheck = await bcrypt.compare(password, foundUser.password);
    if (!passwordCheck) {
        return res
            .status(401)
            .json({
                message: "Invalid! Please check your username and password!",
            });
    }

    // Generate jwt token
    const accessToken = jwt.sign(
        {
            Info: {
                id: foundUser._id,
                validated: foundUser.validated,
            },
        },
        process.env.AUTH_ACCESS_TOKEN,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { id: foundUser._id },
        process.env.AUTH_REFRESH_TOKEN,
        { expiresIn: "1d" }
    );

    console.log(refreshToken);

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    // Send accessToken containing username
    res.json({ accessToken });
});

// @desc Login
// @route POST /auth/login/guest
// @access Public
const loginAsGuest = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { guestId } = mongoose.sanitizeFilter(req.body);
    const foundGuest = await Guest.findOne({ 'guestId': guestId }).exec();
    if (!foundGuest) {
        return res.status(401).json({ message: "Invalid!" });
    }

    // Generate jwt token
    const accessToken = jwt.sign(
        {
            Info: {
                id: foundGuest._id,
                validated: true,
            },
        },
        process.env.AUTH_ACCESS_TOKEN,
        { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        { id: foundGuest._id },
        process.env.AUTH_REFRESH_TOKEN,
        { expiresIn: "1d" }
    );

    console.log(refreshToken);

    // Create secure cookie with refresh token
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    // Send accessToken containing username
    res.json({ accessToken });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Main - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.AUTH_REFRESH_TOKEN,
        asyncHandler(async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Forbidden" });
            }
            console.log("HERE")
            let foundUser = await User.findOne({
                _id: decoded.id,
            }).exec();
            if (!foundUser) {
                foundUser = await Guest.findOne({
                    _id: decoded.id,
                }).exec();
                if (!foundUser) {
                    return res.status(403).json({ message: "Forbidden" });
                }
            }

            const accessToken = jwt.sign(
                {
                    Info: {
                        id: foundUser._id,
                        validated: true,
                    },
                },
                process.env.AUTH_ACCESS_TOKEN,
                { expiresIn: "15m" }
            );
            console.log("THERE")
            res.json({ accessToken });
        })
    );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "Cookie cleared" });
};

module.exports = {
    login,
    loginAsGuest,
    refresh,
    logout,
};
