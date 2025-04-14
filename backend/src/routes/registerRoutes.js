const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/")
  .get(function(req, res, next) {
    res.render("login", { title: "Login" });
  })
  .post(userController.createNewUser)

module.exports = router;