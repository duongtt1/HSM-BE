const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const NotiModel = require("../models/NotiModel");
const UserModel = require("../models/UserModel");

exports.createNoti = asyncHandler(async (req, res, next) => {
    try {
        const newNoti = new NotiModel(req.body);
        const savedNoti = await newNoti.save();
        if (savedNoti == null) {
            res.status(400).json({ success: false, message: err.message });
        } else {
            res.status(200).json({
                success: true
            });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.getAllNoti = asyncHandler(async (req, res, next) => {
    try {
        const noti = await NotiModel.find();
        res.status(200).json({
            success: true,
            data: noti
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.deleteNoti = asyncHandler(async (req, res, next) => {
    try {
        await res.noti.remove();
        res.json({ success: true, message: 'Deleted user' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

exports.getNoti = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: res.notis });
});

exports.updateReadedAllNoti = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findOne({ username: req.params.id });

    if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
    }
    console.log(user._id)
    const d = await NotiModel.find({user: user._id});
    console.log(d)
    const result = await NotiModel.updateMany(
    { user: user._id },
    { $set: { "noti.$[].isRead": true } }
    );

    res.status(200).json({ success: true});

});

exports.updateUnReadedAllNoti = asyncHandler(async (req, res, next) => {
    const user = await UserModel.findOne({ username: req.params.id });

    if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
    }
    console.log(user._id)
    const d = await NotiModel.find({user: user._id});
    console.log(d)
    const result = await NotiModel.updateMany(
    { user: user._id },
    { $set: { "noti.$[].isRead": false } }
    );

    res.status(200).json({ success: true});

});


exports.updateNoti = asyncHandler(async (req, res, next) => {
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateFields[key] = value;
    }
    try {
        await NotiModel.updateOne({ _id: res.noti._id }, { $set: updateFields });
        const updatedNoti = await NotiModel.findById(res.noti._id);
        res.status(200).json({ success: true, data: updatedNoti });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

// Middleware function to get a single user by ID
exports.getNotiMdw = asyncHandler(async (req, res, next) => {
    let noti;
    try {
        // noti = await NotiModel.find({ user.userId : req.params.id});
        if (noti == null) {
            return res.status(404).json({ success: false, message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Cannot find user' });
    }
    res.noti = noti;
    next();
});


