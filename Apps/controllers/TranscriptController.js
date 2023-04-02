const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const TranscriptModel = require("../models/TranscriptModel");

exports.createTranscript = asyncHandler(async (req, res, next) => {
    try {
        const newTranscript = new TranscriptModel(req.body);
        const savedTranscript = await newTranscript.save();
        if (savedTranscript == null ){
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

exports.getAllTranscripts = asyncHandler(async (req, res, next) => {
    try {
        const transcripts = await TranscriptModel.find();
        res.status(200).json({
            success: true,
            data: transcripts
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.deleteTranscript = asyncHandler(async (req, res, next) => {
    try {
        await res.transcript.remove();
        res.json({ success: true, message: 'Deleted subject' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

exports.getTranscript = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: res.transcript });
});

exports.updateTranscript = asyncHandler(async (req, res, next) => {
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateFields[key] = value;
    }
    try {
        await TranscriptModel.updateOne({ _id: res.transcript._id }, { $set: updateFields });
        const updatedTranscript = await TranscriptModel.findById(res.transcript._id);
        res.status(200).json({ success: true, data: updatedTranscript });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

// Middleware function to get a single user by ID
exports.getTranscriptMdw = asyncHandler(async (req, res, next) => {
    let transcript;
    try {
        transcript = await TranscriptModel.findById(req.params.id);
        if (transcript == null) {
            return res.status(400).json({ success: false, message: 'Cannot find transcript' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Cannot find transcript' });
    }
    res.transcript = transcript;
    next();
});


