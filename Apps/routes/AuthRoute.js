const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    login
} = require("../controllers/AuthController");

router.route("/login").post(login)
module.exports = router;