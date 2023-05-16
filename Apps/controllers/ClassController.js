const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const ClassModel = require("../models/ClassModel");

exports.createClass = asyncHandler(async (req, res, next) => {
    try {
        const newClass = new ClassModel(req.body);
        const savedClass = await newClass.save();
        if (savedClass == null ){
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

exports.getAllClass = asyncHandler(async (req, res, next) => {
    try {
        const classes = await ClassModel.find();
        res.status(200).json({
            success: true,
            data: classes
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.deleteClass = asyncHandler(async (req, res, next) => {
    try {
        await res.classes.remove();
        res.json({ success: true, message: 'Deleted user' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

exports.getClass = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: res.classes });
});

exports.getAllMemberClass = asyncHandler(async (req, res, next) => {
    classID = req.params.id
    ret = await ClassModel.findOne({classID}).populate("members")

    res.status(200).json({ success: true, data: ret.members });
});

exports.updateClass = asyncHandler(async (req, res, next) => {
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateFields[key] = value;
    }
    try {
        await ClassModel.updateOne({ _id: res.classes._id }, { $set: updateFields });
        const updatedClass = await ClassModel.findById(res.classes._id);
        res.status(200).json({ success: true, data: updatedClass });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

// Middleware function to get a single user by ID
exports.getClassMdw = asyncHandler(async (req, res, next) => {
    let classes;
    try {
        classes = await ClassModel.findById(req.params.id);
        if (classes == null) {
            return res.status(404).json({ success: false, message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Cannot find user' });
    }
    res.classes = classes;
    next();
});


