const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const SubjectModel = require("../models/SubjectModel");

exports.createSubject = asyncHandler(async (req, res, next) => {
    try {
        const newSubject = new SubjectModel(req.body);
        const savedSubject = await newSubject.save();
        if (savedSubject == null ){
            res.status(400).json({ 
                success: false,
                message: err.message 
            });
        }else{
            res.status(200).json({
                success: true
            });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.getAllSubjects = asyncHandler(async (req, res, next) => {
    try {
        const subjects = await SubjectModel.find();
        res.status(200).json({
            success: true,
            data: subjects
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.deleteSubject = asyncHandler(async (req, res, next) => {
    try {
        await res.subject.remove();
        res.json({ success: true, message: 'Deleted subject' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

exports.getSubject = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: res.subject });
});

exports.updateSubject = asyncHandler(async (req, res, next) => {
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateFields[key] = value;
    }
    try {
        await SubjectModel.updateOne({ _id: res.subject._id }, { $set: updateFields });
        const updatedSubject = await SubjectModel.findById(res.subject._id);
        res.status(200).json({ success: true, data: updatedSubject });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

// Middleware function to get a single user by ID
exports.getSubjectMdw = asyncHandler(async (req, res, next) => {
    let subject;
    try {
        subject = await SubjectModel.findById(req.params.id);
        if (subject == null) {
            return res.status(400).json({ success: false, message: 'Cannot find subject' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Cannot find subject' });
    }
    res.subject = subject;
    next();
});


