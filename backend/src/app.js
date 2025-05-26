require('dotenv').config();

// Create express app
const express = require("express");
const app = express();

// Setup middlewares
// Requests logger
const { logger } = require("./middleware/logger");
app.use(logger);

// Errors logger
const errorLogger = require("./middleware/errorHandler");
app.use(errorLogger);

// Built-in middleware to parses incoming requests with JSON payloads
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Middleware to compress response bodies
const compression = require("compression");
app.use(compression());

// Cross-origin resource sharing
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
app.use(cors(corsOptions));

// Connect to MongoDB
const db = require("./config/DBConnection");

db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
});

db.once("open", () => {
    console.log("Connected to MongoDB");
});

db.on("disconnected", () => {
    console.log("Disconnected from MongoDB");
});

// Setup all routers
const userRouter = require("./routes/userRoutes");
const guestRouter = require("./routes/guestRoutes");
const authRouter = require("./routes/authRoutes");
const validateRouter = require("./routes/validateRoutes");
const passwordRouter = require("./routes/passwordRoutes");

// Setup API routes
app.use("/user", userRouter);
app.use("/guest", guestRouter);
app.use("/auth", authRouter);
app.use("/validate", validateRouter);
app.use("/passwords", passwordRouter);

// Handle errors
app.use(function (err, req, res, next) {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // Render the error page
    res.status(err.status || 500);
    res.send("error");
});

module.exports = app;
