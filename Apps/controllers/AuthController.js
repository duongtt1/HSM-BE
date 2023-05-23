const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const UserModel = require("../models/UserModel");

exports.login = asyncHandler(async (req, res, next) => {
    try {
        username = req.body.username;
        password = req.body.password;

        user = await UserModel.findOne({ username: username, password: password });
        if (user != null) {
            res.status(200).json({ success: true, data: user });
        } else {
            res.status(400).json({ success: false, message: "Wrong username or password" });
        }


    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});
