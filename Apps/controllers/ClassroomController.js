const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const ClassRoomModel = require("../models/ClassRoomModel");

exports.createClassroom = asyncHandler(async (req, res, next) => {
    try {
        const newClassroom = new ClassRoomModel(req.body);
        const savedClassroom = await newClassroom.save();
        if (savedClassroom == null ){
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

exports.getAllClassroom = asyncHandler(async (req, res, next) => {
    try {
        const cr = await ClassRoomModel.find();
        res.status(200).json({
            success: true,
            data: cr
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.deleteClassroom = asyncHandler(async (req, res, next) => {
    try {
        await res.cr.remove();
        res.json({ success: true, message: 'Deleted user' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

exports.getClassroom = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: res.cr });
});

exports.updateClassroom = asyncHandler(async (req, res, next) => {
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateFields[key] = value;
    }
    try {
        await ClassRoomModel.updateOne({ _id: res.cr._id }, { $set: updateFields });
        const updatedClassroom = await ClassRoomModel.findById(res.cr._id);
        res.status(200).json({ success: true, data: updatedClassroom });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

// Middleware function to get a single user by ID
exports.getClassroomMdw = asyncHandler(async (req, res, next) => {
    let cr;
    try {
        cr = await ClassRoomModel.findById(req.params.id);
        if (cr == null) {
            return res.status(404).json({ success: false, message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Cannot find user' });
    }
    res.cr = cr;
    next();
});


