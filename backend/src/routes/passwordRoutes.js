const express = require("express");
const router = express.Router();
const passwordController = require("../controllers/passwordController");
const verifyJWT = require("../middleware/verifyJWT");

// Allow only authenticated requests by JWT
router.route("/:id").get(passwordController.getPasswordsById);

router.route("/")
    .post(passwordController.createNewPassword)
    .put(passwordController.updatePassword)
    .delete(passwordController.deletePassword);

module.exports = router;
