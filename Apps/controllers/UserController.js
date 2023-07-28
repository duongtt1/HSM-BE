const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

const accountSid = 'AC886c8b98db22c1456bf483b00ea387fb';
const authToken = '1cbdf1d8b74a802dbb6d6ebbdd186e6f';
const client = require('twilio')(accountSid, authToken);


//! Models
const UserModel = require("../models/UserModel");
const ParentModel = require("../models/ParentModel");

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
        user = await UserModel.findOne({ username: req.params.id });
        if (user == null) {
            return res.status(404).json({ success: false, message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Cannot find user' });
    }
    res.user = user;
    next();
});

exports.sendSmsToParent = asyncHandler(async (req, res, next) => {
    content = req.body.content;
    studentID = req.params.id;
    try {
        _user = await UserModel.findOne({ username: studentID });
        if (_user == null) {
            return res.status(404).json({ success: false, message: 'Cannot find user' });
        }
        _parent = await ParentModel.findOne({ student: _user._id });
        if (_parent == null) {
            return res.status(404).json({ success: false, message: 'Cannot find parent' });
        }

        const response = await client.messages.create({
            body: content,
            from: '+17854501156',
            to: _parent.phoneNumber
        });
        if (response.errorCode == null) {
            res.status(200).json({
                success: true
            })
        } else {
            res.status(400).json({
                success: false,
                message: response.errorMessage
            })
        }
    } catch (error) {
        console.error('Failed to send SMS:', error);
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
});
