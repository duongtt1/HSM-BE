const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const UserModel = require("../models/UserModel");

exports.createUser = asyncHandler(async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body);
        const savedUser = await newUser.save();
        res.status(201).json({
            success: true
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.getAllUser = asyncHandler(async (req, res, next) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
    try {
        await res.user.remove();
        res.json({ success: true, message: 'Deleted user' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

exports.getUser = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: res.user });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateFields[key] = value;
    }
    try {
        await UserModel.updateOne({ _id: res.user._id }, { $set: updateFields });
        const updatedUser = await UserModel.findById(res.user._id);
        res.status(200).json({ success: true, data: updatedUser });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

// Middleware function to get a single user by ID
exports.getUserMdw = asyncHandler(async (req, res, next) => {
    let user;
    try {
        user = await UserModel.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ success: false, message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Cannot find user' });
    }
    res.user = user;
    next();
});


