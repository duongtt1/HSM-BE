const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const LogModel = require("../models/LogModel");
const UserModel = require("../models/UserModel");

exports.createLog = asyncHandler(async (req, res, next) => {
    try {
        userID = req.body.userID;
        content = req.body.content;
        user = await UserModel.findOne({ username: userID });
        if (user != null) {
            _id_user = user._id;
            logObj = await LogModel.findOne({ user: _id_user });
            if (logObj != null) {
                logObj.logs.push(content);
                await logObj.save();
                res.status(200).json({ success: true });
            } else {
                const newLog = new LogModel({
                    user: _id_user,
                    logs: [content]
                });
                await newLog.save();
                res.status(200).json({ success: true });
            }
        } else {
            res.status(400).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

function get10ElementsAtEndofArray(array) {
    if (array.length > 10) {
        return array.slice(array.length - 10, array.length);
    } else {
        return array;
    }
}

exports.getLogByUserID = asyncHandler(async (req, res, next) => {
    try {
        userID = req.params.userID;
        user = await UserModel.findOne({ username: userID });
        if (user != null) {
            _id_user = user._id;
            logObj = await LogModel.findOne({ user: _id_user });
            if (logObj != null) {
                data = get10ElementsAtEndofArray(logObj.logs);
                res.status(200).json({ success: true, data: data });
            } else {
                res.status(400).json({ success: false, message: "Log not found" });
            }
        } else {
            res.status(400).json({ success: false, message: "User not found" });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});