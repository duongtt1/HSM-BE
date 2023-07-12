const express = require("express");
const router = express.Router();

const { protect, authorize } = require("../middlewares/auth");

const {
    login,
    studentLogin,
    updateDeviceLogin
} = require("../controllers/AuthController");

router.route("/login").post(login)
router.route("/studentLogin").post(studentLogin)
router.route("/updatedevlogin").post(updateDeviceLogin)

module.exports = router;