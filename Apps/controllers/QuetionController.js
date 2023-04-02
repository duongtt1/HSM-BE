const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const QuetionModel = require("../models/QuetionModel");

exports.createQuetion = asyncHandler(async (req, res, next) => {
    try {
        const newQue = new QuetionModel(req.body);
        const savedQue = await newQue.save();
        if (savedQue == null ){
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

exports.getAllQuetions = asyncHandler(async (req, res, next) => {
    try {
        const quetions = await QuetionModel.find();
        res.status(200).json({
            success: true,
            data: quetions
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.deleteQuetion = asyncHandler(async (req, res, next) => {
    try {
        await res.quetion.remove();
        res.json({ success: true, message: 'Deleted quetion' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

exports.getQuetion = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: res.quetion });
});

exports.updateQuetion = asyncHandler(async (req, res, next) => {
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateFields[key] = value;
    }
    try {
        await QuetionModel.updateOne({ _id: res.quetion._id }, { $set: updateFields });
        const updatedQue = await QuetionModel.findById(res.quetion._id);
        res.status(200).json({ success: true, data: updatedQue });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

// Middleware function to get a single user by ID
exports.getQuetionMdw = asyncHandler(async (req, res, next) => {
    let quetion;
    try {
        quetion = await QuetionModel.findById(req.params.id);
        if (quetion == null) {
            return res.status(400).json({ success: false, message: 'Cannot find quetion' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Cannot find quetion' });
    }
    res.quetion = quetion;
    next();
});


