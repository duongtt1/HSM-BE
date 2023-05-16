const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/errorResponse");

//! Models
const DocsModel = require("../models/DocsModel");
const UserModel = require("../models/UserModel");

exports.createDoc = asyncHandler(async (req, res, next) => {
    try {
        const newDoc = new DocsModel(req.body);
        const savedDoc = await newDoc.save();
        if (savedDoc == null ){
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

exports.getAllDocs = asyncHandler(async (req, res, next) => {
    try {
        const docs = await DocsModel.find();
        res.status(200).json({
            success: true,
            data: docs
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

exports.deleteDoc = asyncHandler(async (req, res, next) => {
    try {
        await res.doc.remove();
        res.json({ success: true, message: 'Deleted document' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

exports.getDoc = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true, data: res.doc });
});

exports.updateDoc = asyncHandler(async (req, res, next) => {
    const updateFields = {};
    for (const [key, value] of Object.entries(req.body)) {
        updateFields[key] = value;
    }
    try {
        await DocsModel.updateOne({ _id: res.doc._id }, { $set: updateFields });
        const updatedDoc = await DocsModel.findById(res.doc._id);
        res.status(200).json({ success: true, data: updatedDoc });
    } catch (err) {
        res.status(400).json({ success: false, data: err.message });
    }
});

// Middleware function to get a single user by ID
exports.getDocMdw = asyncHandler(async (req, res, next) => {
    let doc;
    try {
        doc = await DocsModel.findById(req.params.id);
        if (doc == null) {
            return res.status(404).json({ success: false, message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Cannot find user' });
    }
    res.doc = doc;
    next();
});

exports.getDocByAuthorMdw = asyncHandler(async (req, res, next) => {
    let doc;
    try {
        user = await UserModel.findOne({username: req.params.id})
        doc = await DocsModel.find({author: user._id});
        if (doc == null) {
            return res.status(404).json({ success: false, message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Cannot find user' });
    }
    res.doc = doc;
    next();
});


