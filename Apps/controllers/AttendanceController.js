const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const AttendanceModel = require("../models/AttendanceModel");

exports.createAttendance = asyncHandler(async (req, res, next) => {
    try {
        const newAttendance = new AttendanceModel(req.body);
        const savedAttendance = await newAttendance.save();
        if (savedAttendance == null ){
            res.status(400).json({ success: false, message: err.message });
        }else{
            res.status(200).json({
                success: true
            });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.getAllAttendance = asyncHandler(async (req, res, next) => {
    try {
        const attendances = await AttendanceModel.find();
        res.status(200).json({
            success: true,
            data: attendances
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.deleteAttendance = asyncHandler(async (req, res, next) => {
    try {
        await res.attendance.remove();
        res.json({ success: true, message: 'Deleted user' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

exports.getAttendance = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: res.attendance });
});

exports.updateAttendance = asyncHandler(async (req, res, next) => {
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateFields[key] = value;
    }
    try {
        await AttendanceModel.updateOne({ _id: res.attendance._id }, { $set: updateFields });
        const updatedAttendance = await AttendanceModel.findById(res.attendance._id);
        res.status(200).json({ success: true, data: updatedAttendance });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

// Middleware function to get a single user by ID
exports.getAttendanceMdw = asyncHandler(async (req, res, next) => {
    let attendance;
    try {
        attendance = await AttendanceModel.findById(req.params.id);
        if (attendance == null) {
            return res.status(404).json({ success: false, message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Cannot find user' });
    }
    res.attendance = attendance;
    next();
});


