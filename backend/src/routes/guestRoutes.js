const express = require("express");
const router = express.Router();
const guestController = require("../controllers/guestController");

router.route("/").post(guestController.createNewGuest);

module.exports = router;
