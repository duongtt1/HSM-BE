const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const UserModel = require("../models/UserModel");

exports.login = asyncHandler(async (req, res, next) => {
    try {
        username = req.body.username;
        password = req.body.password;
        deviceLogin = req.body.deviceLogin;
        user = await UserModel.findOne({ username: username, password: password });
        if (user != null) {
            user.deviceLogin = deviceLogin;
            await user.save();
            res.status(200).json({ success: true, data: user });
        } else {
            res.status(400).json({ success: false, message: "Wrong username or password" });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.studentLogin = asyncHandler(async (req, res, next) => {
    try {
        username = req.body.username;
        password = req.body.password;
        deviceLogin = req.body.deviceLogin;
        // console.log(req.body.deviceLogin)
        user = await UserModel.findOne({ username: username, password: password, role: "student" });
        // console.log(user);
        user.deviceLogin = deviceLogin;
        await user.save();
        if (user != null) {
            res.status(200).json({ success: true, data: user });
        } else {
            res.status(400).json({ success: false, message: "Wrong username or password" });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.updateDeviceLogin = asyncHandler(async (req, res, next) => {
    try {
        userID = req.body.userID;
        deviceLogin = req.body.deviceLogin;
        user = await UserModel.findOne({ userID: userID });
        if (user != null) {
            user.deviceLogin = deviceLogin;
            await user.save();
            res.status(200).json({ success: true, data: user });
        } else {
            res.status(400).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});